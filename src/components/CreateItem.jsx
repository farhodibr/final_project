import { event } from "jquery";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";


export default function CreateItem() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  //console.log(itemName);
  //console.log(itemPrice);
  //console.log(itemQuantity);

  const postItem = (event) => {
    event.preventDefault();
    axios
    .post('https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory', {
        itemName,
        itemPrice,
        itemQuantity,
  })
  .then((res) => {
    console.log(res);
    
  })
  .catch((err) => {
    console.log(err);
  });
  };


  return (
    <Form>
      <Row>
        <Col xs={7}>
            Enter Item Name     
          <Form.Control 
          placeholder="Item Name" 
          onChange={(event) => {setItemName(event.target.value)}}/>
        </Col>
        <Col>
            Enter Item Quantity
          <Form.Control 
          placeholder="Quantity"
          onChange={(event) => {setItemQuantity(event.target.value)}} />
        </Col>
        <Col>
            Enter Item Price
          <Form.Control 
          placeholder="Price" 
          onChange={(event) => {setItemPrice(event.target.value)}}/>

        </Col>
        <Button
        type='submit'
        onClick={postItem}>
            Submit
        </Button>
      </Row>
    </Form>
  );
}