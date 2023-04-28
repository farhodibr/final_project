import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function SearchCustomers() {
  const [customerOrdersAPI, setCustomerOrdersAPI] = useState([]);
  const [customersAPI, setCustomersAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Customers")
      .then((res) => {
        setCustomersAPI(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Orders")
      .then((res) => {
        setCustomerOrdersAPI(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchCustomer = (e) => {
    e.preventDefault();
    let customerName = document.getElementById("customerName").value;
    let customerAddress = document.getElementById("customerAddress").value;
    let customerPhone = document.getElementById("customerPhone").value;
    let customerEmail = document.getElementById("customerEmail").value;

    let filteredCustomers = customersAPI.filter((customer) => {
      if (
        customer.custName === customerName &&
        customer.custAddress === customerAddress &&
        customer.custPhone === customerPhone &&
        customer.custEmail === customerEmail
      ) {
        return customer;
      } else {
        return null;
      }
    });

    // Handle filtered customers

  };

  const handleShowModal = () => {
    // Show modal
    setShowModal(true);
  };

  return (
    <div className="container fade-in">
      <br />
      <Button className="fade-in" variant="primary" onClick={() => handleShowModal()}>
      Search for Customer
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Order Date</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {customerOrdersAPI.map((customerOrder) => (
                <tr key={customerOrder.id}>
                  <td>{customerOrder.id}</td>
                  <td>{customerOrder.custId}</td>
                  <td>{customerOrder.orderDate}</td>
                  <td>{customerOrder.orderTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
