import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import EditItem from "./EditItem";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortNumericDown } from "react-icons/bs";
import Comments from "./ItemComment";

export default function GetItem() {
  const [APIdata, setAPIdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

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

  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory")
      .then((res) => {
        setAPIdata(res.data);
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
            <th>
              Item Name{" "}
              <Button variant="link" onClick={sortItemsByName}>
                <BsSortAlphaDown />
              </Button>
            </th>
            <th>
              Item Quantity
              <Button variant="link" onClick={sortItemsByQuantity}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>
              Item Price
              <Button variant="link" onClick={sortItemsByPrice}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>
              Item Total Price
              <Button type="sort" variant="link" onClick={sortItemsByTotal}>
                <BsSortNumericDown />
              </Button>
            </th>
            <th>Edit</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length > 0
            ? sortedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemTotalPrice}</td>
                  
                  <td>
                    <EditItem item={item} />
                  </td>
                  <td>
                    <Comments itemID={item} />
                  </td>
                </tr>
              ))
            : APIdata.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemTotalPrice}</td>
                
                  <td>
                    <EditItem item={item} />
                  </td>
                  <td>
                    <Comments itemID={item} />
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
}
