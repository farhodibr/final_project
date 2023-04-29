import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function ViewCustomerOrders(props) {
  const { name, phone, email, orders } = props;
  const [customerOrdersAPI, setCustomerOrdersAPI] = useState([]);
  const [customersAPI, setCustomersAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredCustomerOrders, setFilteredCustomerOrders] = useState([]);

  console.log(orders);

  // Search for customer orders
  const searchCustomer = () => {
    let filteredOrders = orders.filter((order) => {
      if (order.custName === name && order.custPhone === phone) {
        return order;
      } else {
        return null;
      }
    });
    console.log(filteredOrders);
    function getAllOrders(customers) {
      const orders = [];

      // Loop through each customer object
      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];

        // Add the customer's order array to the orders array
        orders.push(...customer.customerOrder);
        console.log(orders);
      }

      return orders;
    }

    setFilteredCustomerOrders(getAllOrders(filteredOrders));
    console.log(filteredCustomerOrders);
  };

  const handleShowModal = () => {
    // Show modal
    setShowModal(true);
  };

  return (
    <div className="container fade-in">
      <br />
      <Button
        className="fade-in"
        variant="primary"
        onClick={() => {
          handleShowModal();
          searchCustomer();
        }}
      >
        View Orders
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{name} Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Item Price</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomerOrders.map((customerOrder) => (
                <tr key={customerOrder.id}>
                  <td>{customerOrder.id}</td>
                  <td>{customerOrder.itemName}</td>
                  <td>{customerOrder.soldItemQuantity}</td>
                  <td>{customerOrder.soldItemPrice}</td>
                  <td>{customerOrder.soldItemTotalPrice}</td>
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
