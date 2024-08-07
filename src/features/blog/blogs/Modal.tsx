import React, { FC } from 'react';
import './blogsStyles/modal.css';

interface IModal {
  title: string;
  content: string;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ title, content, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;