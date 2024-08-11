// src/components/ModalComponent.tsx

import React from 'react';
import Modal from 'react-modal';

interface AnmeldeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

const AnmeldeModal: React.FC<AnmeldeModalProps> = ({
  isOpen,
  onRequestClose,
  message,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Benachrichtigung"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          color: '#f4f4f4',
          backgroundColor: 'black',
          borderRadius: '10px',
          padding: '20px',
          width: '500px',          
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        },
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Benachrichtigung</h2>
      <p>{message}</p>
      <button
        onClick={onButtonClick}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {buttonLabel}
      </button>
    </Modal>
  );
};

export default AnmeldeModal;
