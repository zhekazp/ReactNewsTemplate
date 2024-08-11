import React from "react";
import Modal from "react-modal";

interface LöschenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const LöschenModal: React.FC<LöschenModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Deletion"
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
      <h2 style={{ marginBottom: '20px' }}>Löschen bestätigen</h2>
      <p>Sind Sie sicher, dass Sie das Produkt löschen möchten? "{productName}"?</p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={onConfirm}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Löschen
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Abbrechen
        </button>
      </div>
    </Modal>
  );
};

export default LöschenModal;
