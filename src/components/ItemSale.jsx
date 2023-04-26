import React, { useState, useEffect, useRef, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import CreateCustomer from "./CustomerInfo";


// This component is used to display the sales data
// and to allow the user to edit the data
// and save it to the API
// I'm still working on the save function

export default function Sales() {
  // Define the state variables for the component
  const [salesData, setSalesData] = useState([]);
  const [soldItemQuantity, setSoldItemQuantity] = useState(0);
  const [soldItemPrice, setSoldItemPrice] = useState(0);
  const [soldItemTotalPrice, setSoldItemTotalPrice] = useState(0);
  const [soldItemName, setSoldItemName] = useState("");
  const [salesDate, setSalesDate] = useState("");

  const customerOrderRef = useRef([]);
  const [customerOrder, setCustomerOrder] = useState([]);

  useEffect(() => {
    customerOrderRef.current = customerOrder;
  }, [customerOrder]);

  // Fetch the sales data from the mock API when the component is mounted
  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory")
      .then((response) => {
        setSalesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle changes to a table cell
  const handleCellChange = 
    useCallback(
      (event, rowIndex, property) => {
        const updatedSalesData = [...salesData];
        const updatedItem = updatedSalesData[rowIndex];
        // Update the property value with the new value from the table cell
        if (property === "soldItemQuantity") {
          const soldItemQuantityInput = parseInt(event.target.value, 10);
          const soldItemQuantity = isNaN(soldItemQuantityInput);
          const remainingItemQuantity =
            updatedItem.itemQuantity - soldItemQuantity;
          updatedItem.itemQuantity =
            remainingItemQuantity >= 0 ? remainingItemQuantity : 0;
        } else {
          updatedItem[property] = event.target.value;
        }
        // Update the sales data state with the updated item
        if (property === "soldItemQuantity") {
          const soldItemQuantity = parseInt(event.target.value, 10);
          //const remainingItemQuantity = updatedItem.itemQuantity - event.target.value;
          //updatedItem.itemQuantity = remainingItemQuantity >= 0 ? remainingItemQuantity : 0;
          if (soldItemQuantity > 0) {
            // Add the sold item to the customer order
            const customerOrderItem = {
              id: updatedItem.id,
              itemName: updatedItem.itemName,
              soldItemQuantity: event.target.value,
              soldItemPrice: updatedItem.itemPrice,
              soldItemTotalPrice: updatedItem.itemPrice * event.target.value,
            };
            // push the sold item to the customerOrder array
            customerOrderRef.current.push(customerOrderItem);
            setCustomerOrder(customerOrderRef.current);
            // setCustomerOrder((prevOrder) => [...prevOrder, customerOrderItem]);
            console.log(customerOrder);
          }
        }

        setSalesData(updatedSalesData);
      },
      [salesData]
    );

  // Handle save button click
  const handleSave = async () => {
    try {
      const promises = salesData.map((item) =>
        axios.put(
          `https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${item.id}`,
          item
        )
      );
      await axios.all(promises);
      console.log("All updates completed successfully");
    } catch (error) {
      console.log("One or more updates failed");
      console.log(error);
    }
  };

  // Render the component
  return (
    <div className="fade-in">
      <br />
      <h1>Sales</h1>
      <CreateCustomer />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Sold Today</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, rowIndex) => (
            <tr key={item.id}>
              <td>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "itemName")
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.itemPrice}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "itemPrice")
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.itemQuantity}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "itemQuantity")
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "soldItemQuantity")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
