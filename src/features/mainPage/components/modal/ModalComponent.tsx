import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./modalComponent.css";

interface IModalComponent {
  show: boolean;
  title: string;
  content: string;
  buttonContent: string;
  danger: boolean;
  onClose: ()=>void;
}

const ModalComponent = (props: IModalComponent) => {
  
 
  
  const close = (e) => {
    if (
      e.target.className === "modalButton" ||
      e.target.className === "modalComponent"
    ) {
    props.onClose();
    }
  };
  return (
    <>
      {props.show ? (
        <div onClick={(e) => close(e)} className="modalComponent">
          <div className="modalComponentContent">
            <h3
              className={
                props.danger
                  ? "modalComponentDanger modalComponentTitle"
                  : "modalComponentTitle"
              }
            >
              {props.title}
            </h3>
            <div className="modalComponentMessage">
              <p>{props.content}</p>
              <button className="modalButton">{props.buttonContent}</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalComponent;
