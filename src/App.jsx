import CreateItem from "./components/CreateItem";
import GetItemAPI from "./components/GetItemAPI";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
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
                  Create Item
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/get-item-api" /* Creates a link to the GetItemAPI component*/
                >
                  {" "}
                  Get Inventory
                </Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
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
      </Routes>
    </Router> // Closes the BrowserRouter component
  );
}

export default App;
