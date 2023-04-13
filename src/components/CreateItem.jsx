import { event } from "jquery";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import EditItem from "./EditItem";

export default function CreateItem(props) {
  // Sets up state variables using useState hook
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const [itemComment, setItemComment] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering

  // Using useEffect hook to update total price when price or quantity changes

 
  // Defining function to post item data to API
  const postItem = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Formating item price and total price as USD currency strings
    const formattedPrice = Number(itemPrice).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const formattedTotalPrice = Number(itemPrice * itemQuantity).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const formattedItemName = itemName.toUpperCase();
    // Using axios to post item data to mock API
    axios
      .post("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory", {
        itemName: formattedItemName,
        itemPrice: formattedPrice,
        itemQuantity,
        itemTotalPrice: formattedTotalPrice,
        itemComment,
      })
      .then((res) => {
        setItemPrice(0); // Resets itemPrice state to 0
        setItemQuantity(0); // Resets itemQuantity state to 0
        setItemComment(""); // Resets itemComment state to an empty string
        setItemName(""); // Resets itemName state to an empty string
        setItemTotalPrice(0); // Resets itemTotalPrice state to 0
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  };

  // Rendering form using React Bootstrap components
  return (
    <Form>
      <Row>
        <Col xs={5}>
          Enter Item Name
          <Form.Control
            placeholder="Item Name"
            value={itemName}
            onChange={(event) => {
              setItemName(event.target.value); // Updates itemName state with input value
            }}
          />
        </Col>
        <Col>
          Enter Item Quantity
          <Form.Control
            placeholder="Quantity"
            value={itemQuantity}
            onChange={(event) => {
              setItemQuantity(event.target.value); // Updates itemQuantity state with input value
            }}
          />
        </Col>
        <Col>
          Enter Item Price
          <Form.Control
            placeholder="Price"
            value={itemPrice}
            onChange={(event) => {
              setItemPrice(event.target.value); // Updates itemPrice state with input value
            }}
          />
        </Col>
        <Col>
          Item Total Price {itemTotalPrice}
          <Form.Control placeholder="Price" value={itemTotalPrice} /> 
        </Col>
        <Col>
          Leave comment
          <Form.Control 
          placeholder="Comment" 
          value={itemComment} 
          onChange={(event) => {
            setItemComment(event.target.value); // Updates itemComment state with input value
          }} /> 
        </Col>
        <Button type="submit" onClick={postItem} /* Calls postItem function when button is clicked*/> 
          Submit
        </Button>
      </Row>
    </Form>
  );
}
