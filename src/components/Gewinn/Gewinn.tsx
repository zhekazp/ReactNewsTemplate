import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

interface AdPreview {
  id: string;
  title: string;
}

interface AdDetails {
  id: string;
  title: string;
  item: string;
}

function Gewinn() {
  const [adsPreview, setAdsPreview] = useState<AdPreview[]>([]);
  const [selectedAdDetails, setSelectedAdDetails] = useState<AdDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
   
    
	axios.get<AdPreview[]>(`/api/ads`)
      .then(response => {
        setAdsPreview(response.data);
      })
      .catch(error => {
        console.error('Ошибка загрузки объявлений:', error);
        setError('Не удалось загрузить данные');
      });
  }, []);

  const handleMoreClick = (id: string) => {
   axios.get<AdDetails>(`/api/ads/${id}`)
      .then(response => {
        setSelectedAdDetails(response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Ошибка загрузки детальной информации:', error);
        setError('Не удалось загрузить детальную информацию');
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
	 <div className="button-container">
	
     
      {adsPreview.map((ad) => (
        <button className="gradient-button" key={ad.id} 
            onClick={() => handleMoreClick(ad.id)}><h2>{ad.title}</h2>
        </button>
      ))}
	  </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {selectedAdDetails && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Подробная информация</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedAdDetails.item}</Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Gewinn;