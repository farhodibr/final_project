import CreateItem from "./components/CreateItem";
import GetItemAPI from "./components/GetItemAPI";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar className="Navbar" bg="green" expand="lg">
        <Container>
          <Navbar.Brand >Store Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/"> Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/create-item"> Create Item</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/get-item-api"> Get Inventory</Link>
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
      <Routes>
        <Route path="/"></Route>
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/get-item-api" element={<GetItemAPI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
