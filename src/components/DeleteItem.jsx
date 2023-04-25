import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";

export default function DeleteItem(props) {
  // destructuring props
  const { item, APIdata, setAPIdata, getData } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [ID, setID] = useState(item.id);
 
  const [showModal, setShowModal] = useState(false); // Add state variable to show modal
  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering

  const handleCloseModal = () => setShowModal(false); // Add function to close modal
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

 

 
  // Add function to delete item
  const handleDelete = (event, id) => {
    id = ID;
    
    event.preventDefault();
    console.log("Delete item with id:", id);

    // Delete item from API
    axios
      .delete(`https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${id}`, {
        
      })
      .then((res) => {
        console.log(res);
        handleCloseModal();
        getData();
        setShouldRender(true); // Set state variable to true to trigger re-render
        
       
      })
      .catch((err) => {
        console.log(err);
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  };

  return (
    <>
      <Button variant="danger" onClick={() => handleShowModal(item)}>
      Delete
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item Permanently?</Modal.Title>
        </Modal.Header>
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className="" variant="danger" onClick={(e) => handleDelete(e, ID)}>
          Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
