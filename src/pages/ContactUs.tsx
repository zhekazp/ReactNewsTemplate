import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faShare, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from "../store";
import { sendForm, updateForm } from "../features/contactUs/contactUsSlice";
import '../style/contactUs.css'

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

        <section className="contactUs">
            <div className="container">
                <h1 className='newsTopTitle'>Kontaktiere uns</h1>
                <p>Sie können uns auf jede für Sie bequeme Art und Weise kontaktieren. Wir sind rund um die Uhr per E-Mail erreichbar. Sie können auch das unten stehende Schnellkontaktformular verwenden oder uns persönlich im Büro besuchen. Wir beantworten gerne Ihre Fragen.</p>

                <div className="contact-info row">
                    <div className="col-md-4 col-sm-12">
                        <div className="contact-info-item d-flex flex-column">
                            <div className="contact-icon d-flex justify-content-center"><FontAwesomeIcon icon={faPhone} /></div>
                            <div className="contact-text">
                                <span>Phone</span>
                                <a href="tel:+491239876543">+49 (123) 987 65 43</a>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="contact-info-item d-flex flex-column">
                            <div className="contact-icon d-flex justify-content-center"><FontAwesomeIcon icon={faEnvelope} /></div>
                            <div className="contact-text">
                                <span>E-mail</span>
                                <a href="mailto:example@gmail.com">example@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="contact-info-item d-flex flex-column">
                            <div className="contact-icon d-flex justify-content-center"><FontAwesomeIcon icon={faLocationDot} /></div>
                            <div className="contact-text">
                                <span>Adresse</span>
                                <a href="https://maps.app.goo.gl/ivcTYdP5QQ8rjyqJ6" target="_blank">Georgenstraße 35, 10117 Berlin</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-form p-4">
                    <p className='newsTopTitle'>Wir freuen uns über Ihre Ideen und Vorschläge zur Verbesserung unserer Website. Bitte nutzen Sie das Formular, um uns zu kontaktieren.</p>
                    <form onSubmit={handleSendForm} className="contact-input-group">
                        <div className="row">
                            <label className="col-lg-6" htmlFor="name">
                                <input type="text" className="form-input" required value={form.name} name='name' onChange={handleInputChange} placeholder='Geben Sie Ihren Namen ein' />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </label>
                            <label className="col-lg-6" htmlFor="email">
                                <input type="text" className="form-input" required value={form.email} name='email' onChange={handleInputChange} placeholder='Geben Sie Ihre E-Mail-Adresse ein' />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </label>
                        </div>
                        <label className="col-12" htmlFor="message">
                            <textarea value={form.message} name='message' required className="form-input" onChange={handleInputChange} placeholder='Geben Sie Ihre Nachricht ein'></textarea>
                            {errors.message && <div className="error">{errors.message}</div>}
                        </label>
                        {/* <ReCAPTCHA

                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="Your client site key"
                            /> */}

                        <button type="submit" className="submit-btn">
                            {status === 'loading' ? 'Sendung...' : 'Senden'}
                        </button>
                        {status === 'success' && <div>Formular erfolgreich eingereicht!</div>}
                        {status === 'error' && <div>Das Formular konnte nicht übermittelt werden.</div>}
                    </form>
                </div>
            </div>
        </section>


    )
}

export default ContactUs;
