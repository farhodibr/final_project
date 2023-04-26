import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";

export default function EditItem(props) {
  // destructuring props
  const { item, APIdata, setAPIdata, getData } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [ID, setID] = useState(item.id);
  const [itemName, setItemName] = useState(item.itemName);
  const [itemPrice, setItemPrice] = useState(item.itemPrice);
  const [itemQuantity, setItemQuantity] = useState(item.itemQuantity);
  const [itemMeasure, setItemMeasure] = useState(item.itemMeasure);
  const [itemTotalPrice, setItemTotalPrice] = useState(item.itemTotalPrice);
  const [showModal, setShowModal] = useState(false); // Add state variable to show modal
  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering

  const handleCloseModal = () => setShowModal(false); // Add function to close modal
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

 
  // Add function to convert price to USD currency format
  const formattedPrice = Number(itemPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Add function to convert total price to USD currency format
  const formattedTotalPrice = Number(itemPrice * itemQuantity).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Add function to edit item
  const handleEdit = (event, id) => {
    id = ID;
    
    event.preventDefault();
    console.log("Edit item with id:", id);

    // Edit item in API
    axios
      .put(`https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${id}`, {
        itemName,
        itemPrice,
        itemQuantity,
        itemMeasure,
        itemTotalPrice: formattedTotalPrice,
      })
      .then((res) => {
        getData();
        console.log(res);
        handleCloseModal();
        setShouldRender(true); // Set state variable to true to trigger re-render
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
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  };

  return (
    <>
      <Button className="fade-in"
      variant="primary" onClick={() => handleShowModal(item)}>
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
                defaultValue={selectedItem ? selectedItem.itemName : itemName /*sets ddefault value to the selected item name*/}
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
                defaultValue={selectedItem ? selectedItem.itemPrice : "" /*sets ddefault value to the selected item price*/}

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
                defaultValue={selectedItem ? selectedItem.itemQuantity : "" /* sets ddefault value to the selected item quantity*/}
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
