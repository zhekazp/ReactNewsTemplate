import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from "../store";
import { sendForm, updateForm } from "../features/contactUs/contactUsSlice";
// import '../styles/ContactUs.css'

interface Errors {
    name?: string;
    email?: string;
    message?: string;
    recaptcha?: string;
}

const ContactUs = () => {
    const { form, status } = useSelector((state: RootState) => state.contactForm);
    const dispatch: AppDispatch = useDispatch();

    const [errors, setErrors] = useState<Errors>({});

    // const recaptchaRef = React.createRef<ReCAPTCHA>();

    const validateForm = () => {
        const newErrors: Errors = {
            name: "",
            email: "",
            message: ""
        };
        if (!form.name.trim()) {
            newErrors.name = "Name is required and cannot be empty";
        } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required and cannot be empty";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email must be a valid email address";
        }
        if (!form.message.trim()) {
            newErrors.message = "Message is required and cannot be empty";
        } else if (form.message.length > 500) {
            newErrors.message = "Message cannot exceed 500 characters";
        }
        return newErrors;
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(updateForm({ ...form, [name]: value }));
    };


    const handleSendForm = (e: React.FormEvent) => {
        e.preventDefault(); // Отменяем стандартное поведение отправки формы

        const validationErrors = validateForm(); // Выполняем валидацию формы

        if (Object.keys(validationErrors).length > 0) { // Проверяем, есть ли ошибки валидации
            setErrors(validationErrors); // Устанавливаем ошибки в состояние компонента
            return; // Прекращаем выполнение функции, если есть ошибки
        }
        // const recaptchaValue = recaptchaRef.current?.getValue();
        // if (!recaptchaValue) {
        //     setErrors((prevErrors) => ({ ...prevErrors, recaptcha: "Please verify that you are not a robot" }));
        //     return;
        // }


        setErrors({}); // Если ошибок нет, очищаем состояние ошибок

        dispatch(sendForm(form)); // Отправляем данные формы на сервер через Redux
        // recaptchaRef.current?.reset(); // Сбрасываем ReCAPTCHA после успешной отправки
    };

    return (
        <div>
            <section className="contactUs">
                <div className="contact-title">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>You can contact us any way that is convenient for you. We are available 24/7 via email. You can also use a quick contact form below or visit our office personally. We would be happy to answer your questions. </p>
                    </div>
                </div>
                <div className="container d-flex">
                    <div className="contact-info w-50 p-5 list-group">
                        <div className="list-group-item"><FontAwesomeIcon icon={faPhone} /><span> Phone:</span><a href="tel:+491239876543">+49(123)9876543</a></div>
                        <div className="list-group-item"><FontAwesomeIcon icon={faEnvelope} /><span> E-mail:</span><a href="mailto:example@gmail.com">example@gmail.com</a></div>
                    </div>
                    <div className="w-50 p-5">
                        <p>If you have any ideas or suggestions for improving our Web-site, please contact us by filling the form.</p>
                        <form onSubmit={handleSendForm} className="input-group d-flex flex-column">
                            <label htmlFor="name">name
                                <input type="text" className="form-control" required value={form.name} name='name' onChange={handleInputChange} placeholder='Enter your name' />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </label>
                            <label htmlFor="email">e-mail
                                <input type="text" className="form-control" required value={form.email} name='email' onChange={handleInputChange} placeholder='Enter your e-mail' />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </label>
                            <label htmlFor="message">Message
                                <textarea value={form.message} name='message' required className="form-control" onChange={handleInputChange} placeholder='enter your message'></textarea>
                                {errors.message && <div className="error">{errors.message}</div>}
                            </label>
                            {/* <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="Your client site key"
                            /> */}
                            <button type="submit" className="btn btn-info">
                                {status === 'loading' ? 'Sending...' : 'Send'}
                            </button>
                            {status === 'success' && <div>Form submitted successfully!</div>}
                            {status === 'error' && <div>Failed to submit the form.</div>}
                        </form>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default ContactUs;