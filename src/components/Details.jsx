import Modal from "react-bootstrap/Modal";

import "./Details.css";

export const Details = ({ onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Zadania na dzień </Modal.Title>
      </Modal.Header>

      <Modal.Body></Modal.Body>
    </Modal>
  );
};
