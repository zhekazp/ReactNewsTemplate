import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const LogIn: React.FC = () => {
  const [values, setValues] = useState<Values>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validation = (values: Values): Errors => {
    const error: Errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!,.|?><~/])(?=\S+$).{8,}$/;

    if (!values.email) {
      error.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    } else if (!emailPattern.test(values.email)) {
      error.email =
        "Bitte überprüfe, ob deine E-Mail Adresse das korrekte Format hat.";
    }

    if (!values.password) {
      error.password = "Anforderungen sind noch nicht erfüllt.";
    } else if (!passwordPattern.test(values.password)) {
      error.password =
        "Das eingegebene Passwort ist leider nicht korrekt. Bitte überprüfe es.";
    }

    return error;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("api/user/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        const result = await response.json();
        if (result.token) {
          localStorage.setItem("token", result.token);
          // localStorage.setItem("login", {
          //   role: result.role,
          //   log: true;
          // });
          
          navigate('/');
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error(error);
        setMessage("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      }

    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-panel one">
        <div className="form-header">
          <h1>Einloggen</h1>
        </div>
        <div className="form-content">
          <div className="row g-3 needs-validation">
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "black", border: "black" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-envelope-at"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  className="form-control center-input"
                  id="loginEmail"
                  placeholder="E-mail"
                  required
                  style={{
                    backgroundColor: "black",
                    border: "black",
                    color: "white",
                  }}
                />
              </div>
              <style>{`
                  .form-control::placeholder {
                    color: white;
                  }
                `}</style>
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">
                Passwort
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "black", border: "black" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-key"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.537a.5.5 0 0 1 .354.146L10 11.207 12.207 9H14a.5.5 0 0 1 .354.146L16 10a.5.5 0 0 1 0 .708L14.5 12.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708 0L14 10.207l.646-.647a.5.5 0 0 1 .708 0L17 9.207l.646.647a.5.5 0 0 1 .708 0L19 9.207a.5.5 0 0 1 0 .708L17 11.5a.5.5 0 0 1-.708 0L15.207 10.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L10.5 10.207 9 9.207l-2.5-2.5A3 3 0 0 0 4 5z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="form-control center-input"
                  id="loginPassword"
                  placeholder="Passwort"
                  required
                  style={{
                    backgroundColor: "black",
                    border: "black",
                    color: "white",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowPassword}
                  style={{ border: "black", backgroundColor: "black" }}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    style={{ color: "white" }}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <a className="form-recovery" style={{ color: 'red' }} href="#">
                Passwort vergessen?
              </a>
            </div>
            <div className="form-group d-flex flex-column align-items-center">
              <button
                className="btn btn-danger"
                style={{ background: "red", width: "200px", height: "40px" }}
                type="submit"
              >
                Einloggen
              </button>
              <Link
                to="/signup"
                className="btn btn-dark"
                style={{
                  backgroundColor: "black",
                  border: "black",
                  width: "200px",
                  height: "40px",
                }}
              >
                Konto erstellen
              </Link>             
            </div>
            {message && <div className="text-danger mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LogIn;
