import CreateItem from "./components/CreateItem";
import GetItemAPI from "./components/GetItemAPI";
import ItemSale from "./components/ItemSale";
import CreateCustomer from "./components/CustomerInfo";
import CustomerOrders from "./components/CustomerOrders";
import {
  BrowserRouter as Router, // Renames BrowserRouter as Router
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


import NavDropdown from "react-bootstrap/NavDropdown";

import "./App.css";
import "./animation.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <div className="container">
    <Router /* Wrap your app in a BrowserRouter component*/>
      <Navbar className="Navbar" bg="green" expand="lg">
        <Container>
          <Navbar.Brand>Store Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" /* Creates a link to the home page */> Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/create-item" /* Creates a link to the CreateItem component*/
                >
                  {" "}
                  Add Item
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/get-item-api" /* Creates a link to the GetItemAPI component*/
                >
                  {" "}
                  Inventory
                </Link>
              </Nav.Link>
              <Nav.Link>
              <Link
                  to="/create-customer"/* Creates a link to the CreateCustomer component*/
                >
                  {" "}
                  Create Customer's Order
                </Link>
              </Nav.Link>
              
              <Nav.Link>
              <Link
                  to="/customer-orders"/* Creates a link to the CustomerOrders component*/
                >
                  {" "}
                  Customer Orders
                </Link>
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes /* Creates a Routes component to define your app's routes*/>
        <Route path="/" /* Adds a route for the home page*/></Route>
        <Route
          path="/create-item"
          element={
            <CreateItem />
          } /* Adds a route for the CreateItem component*/
        />
        <Route
          path="/get-item-api"
          element={
            <GetItemAPI />
          } /* Adds a route for the GetItemAPI component*/
        />
        <Route
          path="/item-sale"
          element={
            <ItemSale />
          } /* Adds a route for the ItemSale component*/
        />
        <Route
          path="/create-customer"
          element={
            <CreateCustomer />
          } /* Adds a route for the ItemSale component*/
        />
        <Route
          path="/customer-orders"
          element={
            <CustomerOrders />
          } /* Adds a route for the ItemSale component*/
        />
      </Routes>
    

    
    </Router>
    <div className="grid">

    </div>
    </div>
    
  );
}

export default App;
