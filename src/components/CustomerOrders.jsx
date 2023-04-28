import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import SearchCustomers from "./SearchCustomer";

export default function CustomerOrders() {
  const [customerOrdersAPI, setCustomerOrdersAPI] = useState([]); // Add state variable for API data
  const [customersAPI, setCustomersAPI] = useState([]); // Add state variable for API data
  const [showModal, setShowModal] = useState(false); // Add state variable to show modal

  useEffect(() => {
    // Get data from API
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

  return (
    <div className="container fade-in">
      <br />
      <h1>Customers</h1>
      <SearchCustomers />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Phone</th>
            <th>Customer Email</th>
            <th>Customer Orders</th>
          </tr> 
        </thead>
        <tbody>
          {customersAPI.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.custName}</td>
              <td>{customer.custAddressStreet} {', '}
                  {customer.custAddressCity} {', '}
                  {customer.custAddressState} {' '}
                  {customer.custAddressZip}
                  </td>
              <td>{customer.custPhone}</td>
              <td>{customer.custEmail}</td>
              
              <td>  
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  View Orders
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
