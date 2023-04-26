import { event } from "jquery";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import EditItem from "./EditItem";
import ItemMeasure from "./DropdownItemPackage";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function CreateItem(props) {
  // Sets up state variables using useState hook
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(null);
  const [itemTotalPrice, setItemTotalPrice] = useState(null);
  const [itemComment, setItemComment] = useState("");
  const [soldItemQuantity, setSoldItemQuantity] = useState(0);
  const [soldItemPrice, setSoldItemPrice] = useState(0);
  const [soldItemTotalPrice, setSoldItemTotalPrice] = useState(0);
  const [soldItemName, setSoldItemName] = useState("");
  const [salesDate, setSalesDate] = useState("");

  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering
  const [itemMeasure, setItemMeasure] = useState("");

  // Using useEffect hook to update total price when price or quantity changes

  // Defining function to post item data to API
  const postItem = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Formating item price and total price as USD currency strings
    const formattedPrice = Number(itemPrice).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    
    const formattedTotalPrice = Number(itemPrice * itemQuantity).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );

    const formattedItemName = itemName.toUpperCase();
    // Using axios to post item data to mock API
    axios
      .post("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory", {
        itemName: formattedItemName,
        itemPrice,
        itemQuantity,
        itemTotalPrice,
        itemComment,
        itemMeasure,
        soldItemName,
        soldItemPrice,
        soldItemQuantity,
        soldItemTotalPrice,
        salesDate,
      })
      .then((res) => {
        setItemPrice(0); // Resets itemPrice state to 0
        setItemQuantity(0); // Resets itemQuantity state to 0
        setItemComment(""); // Resets itemComment state to an empty string
        setItemName(""); // Resets itemName state to an empty string
        setItemTotalPrice(0); // Resets itemTotalPrice state to 0
        setItemMeasure(""); // Resets itemMeasure state to an empty string
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  };

  // Rendering form using React Bootstrap components
  return (
    <div className=" fade-in">
      <br />
      <h1>Add an Item to Inventory</h1>
    <Form className="create-item-form fade-in">
      <Row>
        <Col xs={2}>
          Enter Item Name
          <Form.Control
            placeholder="Item Name"
            value={itemName}
            onChange={(event) => {
              setItemName(event.target.value); // Updates itemName state with input value
            }}
          />
        </Col>
        <Col xs={2}>
          Enter Item Quantity
          <Form.Control
            placeholder="Quantity"
            value={itemQuantity}
            onChange={(event) => {
              setItemQuantity(event.target.value); // Updates itemQuantity state with input value
            }}
          />
        </Col>
        <Col xs={2}>
        
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown">
              Item Measurement
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button type="submit" onClick={(e) => setItemMeasure("pcs")}>
                  pcs
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button type="submit" onClick={(e) => setItemMeasure("cases")}>
                  cases
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button type="submit" onClick={(e) => setItemMeasure("lbs")}>
                  lbs
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={2}>
          Enter Item Price
          <Form.Control
            placeholder="Price"
            value={itemPrice}
            onChange={(event) => {
              setItemPrice(event.target.value); // Updates itemPrice state with input value
            }}
          />
        </Col>
        <Col xs={2}>
          Item Total Price {itemTotalPrice}
          <Form.Control placeholder="Price" value={itemTotalPrice} />
        </Col>
        <Col xs={2}>
          Leave comment
          <Form.Control
            placeholder="Comment"
            value={itemComment}
            onChange={(event) => {
              setItemComment(event.target.value); // Updates itemComment state with input value
            }}
          />
        </Col>
        <Button
          type="submit"
          onClick={postItem} /* Calls postItem function when button is clicked*/
        >
          Submit
        </Button>
      </Row>
    </Form>
    </div>
  );
}
