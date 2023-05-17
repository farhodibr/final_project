import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";


export default function CreateInvoice(props) {
  const { name, phone, email, streetName, city, state, zip, orders } = props;
  const [customerOrdersAPI, setCustomerOrdersAPI] = useState([]);
  const [customersAPI, setCustomersAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredCustomerOrders, setFilteredCustomerOrders] = useState([]);

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  // Generate unique invoice number
  const invoiceNumber = Math.floor(Math.random() * 1000000);

  // Search for customer orders
  const searchCustomer = () => {
    let filteredOrders = orders.filter((order) => {
      if (order.custName === name && order.custPhone === phone) {
        return order;
      } else {
        return null;
      }
    });

    function getAllOrders(customers) {
      const orders = [];

      // Loop through each customer object
      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];

        // Add the customer's order array to the orders array
        orders.push(...customer.customerOrder);
      }

      return orders;
    }

    setFilteredCustomerOrders(getAllOrders(filteredOrders));
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
        Create Invoice
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{name} Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invoice-container">
            <div className="invoice-header">
              <div className="logo-container">
                
              </div>
              <div className="invoice-details">
                <h2>Invoice</h2>
                <p>Invoice No.: {invoiceNumber}</p>
                <p>Date: {currentDate}</p>
              </div>
            </div>
            <div className="customer-details">
              <h3>Bill To:</h3>
              <p>{name}</p>
              <p>{streetName}</p>
              <p>{city}, {state} {zip}</p>
            </div>
            <div className="table-container">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerOrders.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                     

             
              <td>{item.soldItemQuantity}</td>
              <td>{item.soldItemPrice}</td>
              <td>${item.soldItemTotalPrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total:</td>
            <td>$</td>
          </tr>
        </tfoot>
      </Table>
      </div>
    </div>
  




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
