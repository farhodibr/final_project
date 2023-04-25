import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import EditItem from "./EditItem";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortNumericDown } from "react-icons/bs";
import Comments from "./ItemComment";
import DeleteItem from "./DeleteItem";
import { propTypes } from "react-bootstrap/esm/Image";
import ItemSale from "./ItemSale";

export default function GetItem() {
  // Create state variables
  const [APIdata, setAPIdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);
  const [count, setCount] = useState(0);
  const [shouldRender, setShouldRender] = useState(false); // Add state variable for re-rendering

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Sort functions
  const sortItemsByName = () => {
    const sorted = [...APIdata].sort((a, b) =>
      a.itemName.localeCompare(b.itemName)
    );
    setSortedItems(sorted);
  };

  const sortItemsByPrice = () => {
    const sorted = [...APIdata].sort((a, b) =>
      a.itemPrice.localeCompare(b.itemPrice)
    );
    setSortedItems(sorted);
  };

  const sortItemsByQuantity = () => {
    const sorted = [...APIdata].sort((a, b) =>
      a.itemQuantity.localeCompare(b.itemQuantity)
    );
    setSortedItems(sorted);
  };

  const sortItemsByTotal = () => {
    const sorted = [...APIdata].sort((a, b) =>
      a.itemTotalPrice.localeCompare(b.itemTotalPrice)
    );
    setSortedItems(sorted);
  };


  function GetData() {
    axios
    .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory")
    .then((res) => {
      setAPIdata(res.data);
    })
    .catch((err) => {
      console.log(err);
      setShouldRender(true); // Set state variable to true to trigger re-render
    });
  }

  // Get data from API
  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory")
      .then((res) => {
        setAPIdata(res.data);
      })
      .catch((err) => {
        console.log(err);
        setShouldRender(true); // Set state variable to true to trigger re-render
      });
  }, []);

  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr className="">
            <th>ID</th>
            <th>
              Item Name{" "}
              <Button variant="light" className="btn-sm" onClick={sortItemsByName}>
                <BsSortAlphaDown />
              </Button>
            </th>
            <th>
              Item Quantity{" "}
              <Button variant="light" className="btn-sm" onClick={sortItemsByQuantity}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>
              Item Measure
            </th>
            <th>
              Item Price{" "}
              <Button variant="light" className="btn-sm" onClick={sortItemsByPrice}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>
              Item Total Price
              <Button variant="light" className="btn-sm" onClick={sortItemsByTotal}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>Comment</th>
            <th>Edit</th>
            <th>Delete</th>
            
          </tr>
        </thead>
        <tbody>
          { // If sortedItems is not empty, map through sortedItems, else map through APIdata
          sortedItems.length > 0
            ? sortedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{item.itemMeasure}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemTotalPrice}</td>
                  
                  
                  <td>
                    <Comments itemID={item} />
                  </td>
                  <td>
                    <EditItem item={item} />
                  </td>
                  <td>
                    <DeleteItem item={item} />
                  </td>
                </tr>
              ))
              // Map through APIdata
            : APIdata.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{item.itemMeasure}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemPrice * item.itemQuantity}</td>
                
                 
                  <td>
                    <Comments itemID={item} /* passing props to Comments component*/ />
                  </td>
                  <td>
                    <EditItem item={item} getData={GetData} /* passing props to EditItem component*/ />
                    
                  </td>
                  <td>
                    <DeleteItem item={item} getData={GetData} /* passing props to DeleteItem component*/  />
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}
