import React, { useState } from "react";
import {  Button, Modal, Form } from "react-bootstrap";

export default function Comments(props) {
 
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  console.log("item", props);
  return (
    <>
      <Button variant="primary" onClick={() => handleShowModal()}>
        View Comment
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comment for {props.itemID.itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicItemName">
              <Form.Label>{props.itemID.itemComment}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
