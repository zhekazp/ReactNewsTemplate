import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faShare, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from "../store";
import { clearForm, sendForm, updateForm } from "../features/contactUs/contactUsSlice";
import '../style/contactUs.css'
import Modal from "../features/blog/blogs/Modal";

interface Errors {
    contactName?: string;
    contactEmail?: string;
    contactMessage?: string;
}

const ContactUs = () => {
    const { form, status} = useSelector((state: RootState) => state.contactForm);
    const dispatch: AppDispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showModalErr, setShowModalErr] = useState(false);

    const [errors, setErrors] = useState<Errors>({});
    const [errorMessage, setErrorMessage] = useState<string>("");

    // const recaptchaRef = React.createRef<ReCAPTCHA>();

    const validateForm = () => {
        const newErrors: Errors = {
            contactName: "",
            contactEmail: "",
            contactMessage: ""
        };
        if (!form.contactName.trim()) {
            newErrors.contactName = "Name ist erforderlich und darf nicht leer sein.";
        } else if (!/^[a-zA-Z\s]+$/.test(form.contactName)) {
            newErrors.contactName = "Name darf nur Buchstaben und Leerzeichen enthalten.";
        }
        if (!form.contactEmail.trim()) {
            newErrors.contactEmail = "E-Mail ist erforderlich und darf nicht leer sein";
        } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
            newErrors.contactEmail = "E-Mail muss eine gültige E-Mail-Adresse sein.";
        }
        if (!form.contactMessage.trim()) {
            newErrors.contactMessage = "Nachricht ist erforderlich und darf nicht leer sein.";
        } else if (form.contactMessage.length > 500) {
            newErrors.contactMessage = "Nachricht darf 500 Zeichen nicht überschreiten.";
        }
        return newErrors;
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(updateForm({ [name]: value }));
    };


    const handleSendForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        // console.log('Validation Errors:', validationErrors);
        setErrors(validationErrors);

        const errorMessages = Object.values(validationErrors).filter(Boolean).join("\n");

        if (errorMessages) {
            setErrorMessage(errorMessages);
            setShowModalErr(true);
            return;
        }

        // console.log('Form Data to be Sent:', form);
        try {
            // console.log('Dispatching sendForm with data:', form);
            await dispatch(sendForm(form)).unwrap();
            // console.log('Form sent successfully');
            setShowModal(true);
            dispatch(clearForm());
        } catch (error) {
            console.error("Error sending form:", error);
        }
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
                                <p style={{marginBottom: "0"}}>Berlin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-form p-4">
                    <p className='newsTopTitle'>Wir freuen uns über Ihre Ideen und Vorschläge zur Verbesserung unserer Website. Bitte nutzen Sie das Formular, um uns zu kontaktieren.</p>
                    <form onSubmit={handleSendForm} className="contact-input-group">
                        <div className="row">
                            <label className="col-lg-6" htmlFor="contactName">
                                <input type="text" className="form-input" required value={form.contactName} name='contactName' onChange={handleInputChange} placeholder='Geben Sie Ihren Namen ein' />
                                {/* {errors.contactName && <div className="error">{errors.contactName}</div>} */}
                            </label>
                            <label className="col-lg-6" htmlFor="contactEmail">
                                <input type="text" className="form-input" required value={form.contactEmail} name='contactEmail' onChange={handleInputChange} placeholder='Geben Sie Ihre E-Mail-Adresse ein' />
                                {/* {errors.contactEmail && <div className="error">{errors.contactEmail}</div>} */}
                            </label>
                        </div>
                        <label className="col-12" htmlFor="contactMessage">
                            <textarea value={form.contactMessage} name='contactMessage' required className="form-input" onChange={handleInputChange} placeholder='Geben Sie Ihre Nachricht ein'></textarea>
                            {/* {errors.contactMessage && <div className="error">{errors.contactMessage}</div>} */}
                        </label>


                        <button type="submit" className="submit-btn">
                            {status === 'loading' ? 'Sendung...' : 'Senden'}
                        </button>
                        {status === 'success' && <div>Formular erfolgreich eingereicht!</div>}
                        {status === 'error' && <div>Das Formular konnte nicht übermittelt werden.</div>}
                    </form>
                </div>
                {showModal && (
                    <Modal
                        title=""
                        content="Danke, dass Du uns geschrieben hast! Wir setzen uns so schnell wie möglich mit Dir in Verbindung."
                        onClose={() => setShowModal(false)}
                    />
                )}
                {showModalErr && (
                    <Modal
                        title="Fehler"
                        content={errorMessage}
                        onClose={() => setShowModalErr(false)}
                    />
                )}
            </div>
        </section>


    )
}

export default ContactUs;
