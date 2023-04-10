import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import EditItem from "./EditItem";

export default function GetItem() {
  // Declaring state variables and functions using the useState hook
  const [APIdata, setAPIdata] = useState([]); // An array to store the data fetched from the API
  const [showModal, setShowModal] = useState(false); // A boolean to show/hide the edit modal
  const [selectedItem, setSelectedItem] = useState(null); // An object to store the item selected for editing
  const [itemName, setItemName] = useState(APIdata.itemName); // A string to store the item name
  const [itemPrice, setItemPrice] = useState(APIdata.itemPrice); // A number to store the item price
  const [itemQuantity, setItemQuantity] = useState(APIdata.itemQuantity); // A number to store the item quantity
  const [itemTotalPrice, setItemTotalPrice] = useState(APIdata.itemTotalPrice); // A number to store the total price of the item based on the quantity

  // Function to handle closing the edit modal
  const handleCloseModal = () => setShowModal(false);
  
  // Function to handle opening the edit modal and setting the selectedItem state variable
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Using the useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory", {})
      .then((res) => {
        setAPIdata(res.data); // Sets the state variable APIdata with the data fetched from the API
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Renders a table to display the data fetched from the API
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Quantity</th>
            <th>Item Price</th>
            <th>Item Total Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="Navbar">
          {APIdata.map((item) => (
            <tr className="Navbar" key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.itemQuantity}</td>
              <td>{item.itemPrice}</td>
              <td>{item.itemTotalPrice}</td>
              <td>
                {/* Renders an EditItem component for each item in the APIdata array */}
                <EditItem item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
