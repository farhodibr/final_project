import { event } from "jquery";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import axios from "axios";

export default function CreateCustomer(props) {
  // Sets up state variables using useState hook
  const [greeting, setGreeting] = useState("Add Customer's Info");
  const [custName, setCustName] = useState("");
  const [custAddressStreet, setCustAddressStreet] = useState("");
  const [custAddressCity, setCustAddressCity] = useState("");
  const [custAddressState, setCustAddressState] = useState("");
  const [custAddressZip, setCustAddressZip] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custComment, setCustComment] = useState("");
  const [salesDate, setSalesDate] = useState("");

  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering
  const [itemMeasure, setItemMeasure] = useState("");

  // Using useEffect hook to update total price when price or quantity changes

  // Defining function to post item data to API
  const postCustomer = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Using axios to post item data to mock API
    axios
      .post("https://64095fb26ecd4f9e18aec05b.mockapi.io/Customers", {
        custName,
        custAddressStreet,
        custAddressCity,
        custAddressState,
        custAddressZip,
        custPhone,
        custEmail,
        custComment,
        salesDate,
      })
      .then((res) => {
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  };

  const handleGreeting = () => {
    if (custName.length > 0) {
      setGreeting("Order for " + custName + "");
      return greeting;
      
    } else {
      setGreeting("Add Customer's Information");
      return greeting;
    
    };
  };


  // Rendering form using React Bootstrap components
  return (
    <div className=" fade-in">
      <br />
      <h6>Create Customer</h6>
      <p>{greeting}</p>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1" onClick={handleGreeting}>
          <Accordion.Header>{greeting}</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="name"
                   placeholder="Full Name"
                   onChange={(event) => setCustName(event.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"
                   placeholder="Enter email"
                   onChange={(event) => setCustEmail(event.target.value)} />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="phone"
                   placeholder="Enter phone number"
                   onChange={(event) => setCustPhone(event.target.value)} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" 
                onChange={(event) => setCustAddressStreet(event.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={(event) => setCustAddressCity(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control onChange={(event) => setCustAddressState(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control onChange={(event) => setCustAddressZip(event.target.value)} />
                </Form.Group>
              </Row>

             

              <Button variant="primary"
               type="submit"
               onClick={postCustomer}
               eventKey="0">
                Submit
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
