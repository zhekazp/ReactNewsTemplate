import React from "react";
import "../style/page_404.css";
import { Link } from "react-router-dom";

const Page_404 = () => {
  return (
    <div className="page404-container">
      <h1 className="page404-title">404</h1>
      <p className="page404-message">Ups! Diese Seite wurde nicht gefunden.</p>
      <p className="page404-description">
        Möglicherweise wurde sie entfernt, umbenannt oder Sie haben sich im URL
        vertan.
      </p>
      <Link to="/" className="page404-home-link">
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default Page_404;
