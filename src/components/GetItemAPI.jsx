import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import EditItem from "./EditItem";

export default function GetItem() {
  const [APIdata, setAPIdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState(APIdata.itemName);
  const [itemPrice, setItemPrice] = useState(APIdata.itemPrice);
  const [itemQuantity, setItemQuantity] = useState(APIdata.itemQuantity);
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

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Quantity</th>
            <th>Item Price</th>

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

              <td>
                <EditItem item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
