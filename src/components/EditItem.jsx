import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import '../App.css';

export default function EditItem(props) {
  //destructuring props
  const { APIdata, setAPIdata } = useState(props.selectedItem);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ID, setID] = useState(APIdata.id);
  const [itemName, setItemName] = useState(APIdata.itemName);
  const [itemPrice, setItemPrice] = useState(APIdata.itemPrice);
  const [itemQuantity, setItemQuantity] = useState(APIdata.itemQuantity);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (item) => { //item is the parameter
    setSelectedItem(item);
    setShowModal(true);
  };
  
  const handleEdit = (event, id) => {
    id = APIdata.id;
    event.preventDefault();
    console.log("Edit item with id:", id);

    axios
      .put(`https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${id}`, {
        itemName,
        itemPrice,
        itemQuantity,
      })
      .then((res) => {
        console.log(res);
        handleCloseModal();
        const updatedData = APIdata.map((item) => {
          if (item.id === id) {
            return res.data;
          }
          return item;
        });
        setAPIdata(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
   
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                type="text"
                placeholder="Enter item name"
                defaultValue={selectedItem ? selectedItem.itemName : itemName}
              />
            </Form.Group>

            <Form.Group controlId="formBasicItemPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setItemPrice(e.target.value);
                }}
                type="number"
                placeholder="Enter item price"
                defaultValue={selectedItem ? selectedItem.itemPrice : ""}
              />
            </Form.Group>

            <Form.Group controlId="formBasicItemQuantity">
              <Form.Label>Item Quantity</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setItemQuantity(e.target.value);
                }}
                type="number"
                placeholder="Enter item quantity"
                defaultValue={selectedItem ? selectedItem.itemQuantity : ""}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => handleEdit(e, selectedItem.id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
