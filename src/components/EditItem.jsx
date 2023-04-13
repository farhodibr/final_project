import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";

export default function EditItem(props) {
  // destructuring props
  const { item, APIdata, setAPIdata } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [ID, setID] = useState(item.id);
  const [itemName, setItemName] = useState(item.itemName);
  const [itemPrice, setItemPrice] = useState(item.itemPrice);
  const [itemQuantity, setItemQuantity] = useState(item.itemQuantity);
  const [itemTotalPrice, setItemTotalPrice] = useState(item.itemTotalPrice);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const formattedPrice = Number(itemPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedTotalPrice = Number(itemPrice * itemQuantity).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleEdit = (event, id) => {
    id = ID;
    
    // event.preventDefault();
    console.log("Edit item with id:", id);


    axios
      .put(`https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${id}`, {
        itemName,
        itemPrice: formattedPrice,
        itemQuantity,
        itemTotalPrice: formattedTotalPrice,
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
      <Button variant="primary" onClick={() => handleShowModal(item)}>
        Edit
      </Button>

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
            <Form.Group controlId="formBasicItemQuantity">
              <Form.Label>Item Total Price {itemTotalPrice}</Form.Label>
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleEdit(e, ID)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
