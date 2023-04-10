import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default function GetItem() {
  const [APIdata, setAPIdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory", {})
      .then((res) => {
        setAPIdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (event, id) => {
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {APIdata.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.itemPrice}</td>
              <td>{item.itemQuantity}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
