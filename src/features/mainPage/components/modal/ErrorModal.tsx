
import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from 'react-bootstrap/Button';

const ErrorModal = (props) => {
  return (
    <Modal
    {...props}
    bg="dark"
    data-bs-theme="dark"
    size="lg"
    centered
  >
    <Modal.Header  closeButton>
      <Modal.Title style={{color:"white"}}  id="contained-modal-title-vcenter">
       Error
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p style={{color:"white"}}>
        Server response is error. Try again later.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger"  onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);
};
export default ErrorModal;
