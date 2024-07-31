import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Values {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
}

const SignUp: React.FC = () => {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validation = (values: Values): Errors => {
    const error: Errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!,.|?><~/])(?=\S+$).{8,}$/;

    if (!values.name) {
      error.name = "Benutzername ist erforderlich";
    }

    if (!values.email) {
      error.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    } else if (!emailPattern.test(values.email)) {
      error.email =
        "Bitte überprüfe, ob deine E-Mail Adresse das korrekte Format hat.";
    }

    if (!values.password) {
      error.password = "Passwort ist erforderlich";
    } else if (!passwordPattern.test(values.password)) {
      error.password =
        "Das eingegebene Passwort ist leider nicht korrekt. Bitte überprüfe es.";
    }

    if (!values.terms) {
      error.terms = "Du musst den Nutzungsbedingungen zustimmen.";
    }

    return error;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("api/user/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        const result = await response.json();

        if (response.ok) {
          setMessage(result.message);
          navigate('/');
        } else {
          setMessage(result.message || "Fehler bei der Registrierung.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-panel two">
        <div className="form-header">
          <h1>Anmelden</h1>
        </div>
        <div className="form-content">
          <div className="row g-3 needs-validation">
            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">
                Username
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
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </span>
                <input
                  type="name"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                  className="form-control center-input"
                  id="registerUsername"
                  placeholder="Username"
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
              {errors.name && (
                <div className="text-danger">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label">
                E-mail
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
                  id="registerEmail"
                  placeholder="E-mail"
                  required
                  style={{
                    backgroundColor: "black",
                    border: "black",
                    color: "white",
                  }}
                />
              </div>
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">
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
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="form-control center-input"
                  id="registerPassword"
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
              <label className="form-remember">
                <input
                  type="checkbox"
                  name="terms"
                  checked={values.terms}
                  onChange={handleInput}
                  required
                />{" "}
                Ich stimme den Datenschutzbestimmungen und Nutzungsbedingungen
                zu.
              </label>
              {errors.terms && (
                <span className="text-danger">{errors.terms}</span>
              )}
            </div>
            <div className="form-group d-flex flex-column align-items-center">
              <button
                className="btn btn-danger"
                style={{ background: "red", width: "200px", height: "40px" }}
                type="submit"
              >
                Registrieren
              </button>
              <Link
                to="/login"
                className="btn btn-dark"
                style={{
                  backgroundColor: "black",
                  border: "black",
                  width: "200px",
                  height: "40px",
                }}
                type="submit"
              >
                zurück zum Einloggen
              </Link>
            </div>
            {message && <div className="text-danger mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
