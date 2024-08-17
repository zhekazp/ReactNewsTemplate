import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Modal from 'react-modal';
interface AdPreview {
  advertisingId: string;
  title: string;
}

interface AdDetails {
  //advertisingId:string;
  title: string;
  advertiserName: string;
  advertiserEmail: string;
  advertiserPhone: string;
  discount: string;
  descriptionOfTheCoupon: string;
  createData: string;
  endData: string;
  description: string;
}

function Gewinn() {
  const [adsPreview, setAdsPreview] = useState<AdPreview[]>([]);
  const [selectedAdDetails, setSelectedAdDetails] = useState<AdDetails | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    //axios.get<AdPreview[]>('http://localhost:8080/api/ads')
    axios
      .get<AdPreview[]>("/api/ads")
      .then((response) => {
        setAdsPreview(response.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки объявлений:", error);
        setError("Не удалось загрузить данные");
      });
  }, []);

  const handleMoreClick = (advertisingId: string) => {
    axios
      .get<AdDetails>(`/api/ads/${advertisingId}`)
      //axios.get<AdDetails>(`http://localhost:8080/api/ads/${advertisingId}`)
      .then((response) => {
        setSelectedAdDetails(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Ошибка загрузки детальной информации:", error);
        setError("Не удалось загрузить детальную информацию");
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="button-container">
        {adsPreview.map((ad) => (
          <button
            className="gradient-button"
            key={ad.advertisingId}
            onClick={() => handleMoreClick(ad.advertisingId)}
          >
            <h2>{ad.title}</h2>
          </button>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {selectedAdDetails && showModal? (
      
       <div className="modal">
          <div className=" gewinen-modal">
            <h2>{selectedAdDetails?.advertiserName}</h2>
            <p>{"Sie haben "+selectedAdDetails?.discount+" Rabatt erhalten"}</p>
            <p>Kontaktieren Sie uns: </p>
            <p>Email: {selectedAdDetails?.advertiserEmail} / Tel: {selectedAdDetails?.advertiserPhone}</p>
            <p>Wir bitten: {selectedAdDetails?.description}</p>
            <button className="modalButton" onClick={handleClose}>OK</button>
          </div>
         </div>
      ):<></>}
    </>
  );
}

export default Gewinn;
