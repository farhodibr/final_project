import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import ViewCustomerOrders from "./ViewCustomerOrders";

export default function SearchCustomers() {
  const [customerOrdersAPI, setCustomerOrdersAPI] = useState([]);
  const [customersAPI, setCustomersAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [greeting, setGreeting] = useState("Search Customers");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

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

  /* const handleGreeting = () => {
    if (custName.length > 0) {
      setGreeting("Please enter customer's Name, Phone, and Email");
      return greeting;
      
    } else {
      setGreeting("Search Customers");
      return greeting;
    
    };
  }; */

  const searchCustomer = (e) => {
    e.preventDefault();
    let customerName = document.getElementById("customerName").value;
    let customerPhone = document.getElementById("customerPhone").value;
    let customerEmail = document.getElementById("customerEmail").value;
    setCustomerName(customerName);
    setCustomerPhone(customerPhone);
    setCustomerEmail(customerEmail);

    setFilteredCustomers(
      customersAPI.filter((customer) => {
        if (
          customer.custName.toLowerCase() === customerName.toLowerCase() &&
          customer.custPhone.toLowerCase() === customerPhone.toLowerCase() &&
          customer.custEmail.toLowerCase() === customerEmail.toLowerCase()
        ) {
          return customer;
        } else {
          return null;
        }
      })
    );

    // Handle filtered customers
  };

  const handleShowModal = () => {
    // Show modal
    setShowModal(true);
  };

  return (
    <div className="container fade-in">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>{greeting}</Accordion.Header>
          <Accordion.Body>
            <h4>Search Customers</h4>
            <h4>
              Please enter Customer's Full Name, Phone Number and Email address
            </h4>
            <br />
            <form onSubmit={searchCustomer}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="customerName">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="customerPhone">Phone:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerPhone"
                      placeholder="Enter phone"
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="customerEmail">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="customerEmail"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={searchCustomer}
              >
                Search
              </button>
            </form>

            <div className="row">
              <h5>Matched Customers</h5>
              {filteredCustomers.map((customer) => (
                <div className="col-sm-6" key={customer.id}>
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">{customer.custName}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{customer.custAddressStreet}</p>
                      <p className="card-text">{customer.custAddressCity}</p>
                      <p className="card-text">{customer.custAddressState}</p>
                      <p className="card-text">{customer.custAddressZip}</p>
                      <p className="card-text">{customer.custPhone}</p>
                      <p className="card-text">{customer.custEmail}</p>
                      <ViewCustomerOrders
                        name={customerName}
                        phone={customerPhone}
                        email={customerEmail}
                        orders={customerOrdersAPI}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {
              // Modal to show matched customer
              showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Customer Orders</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Order Date</th>
                          <th>Order Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerOrdersAPI.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.custName}</td>

                            <td>{customer.custPhone}</td>
                            <td>{customer.custEmail}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
