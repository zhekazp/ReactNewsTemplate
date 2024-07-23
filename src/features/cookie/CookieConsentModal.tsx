import React, { useState } from 'react';
import "../../style/cookieConsentModal.css";
import { useNavigate } from "react-router-dom";

const CookieConsentModal = () => {
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    setShow(false);
  };
  const handleAccept = () => {
    // Логика для обработки согласия пользователя
    navigate("/");
    setShow(false);
  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Verwendung von Cookies</h2>
          <p>
            Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu
            verbessern. Durch die weitere Nutzung der Website stimmen Sie
            unserer Verwendung von Cookies zu.
          </p>
          <div className="modal-actions">
            <button className="btn" onClick={handleAccept}>
              Akzeptieren
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Schließen
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsentModal;
