import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import CreateCustomer from "./CustomerInfo";

// This component is used to display the sales data
// and to allow the user to edit the data
// and save it to the API
// I'm still working on the save function

export default function Sales(props) {
  // Define the state variables for the component
  const {
    custName,
    custAddressStreet,
    custAddressCity,
    custAddressState,
    custAddressZip,
    custPhone,
    custEmail,
    custComment,
    salesDate,
  } = props;
  const [salesData, setSalesData] = useState([]);

  const [customerOrder, setCustomerOrder] = useState([]);
  console.log(props.customer, props.phone);

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
  const handleCellChange = useCallback(
    (event, rowIndex, property) => {
      const updatedSalesData = [...salesData];
      const updatedItem = updatedSalesData[rowIndex];

      if (property === "soldItemQuantity") {
        const soldItemQuantity = parseInt(event.target.value, 10);
        const remainingItemQuantity =
          updatedItem.itemQuantity - soldItemQuantity;
        updatedItem.itemQuantity =
          remainingItemQuantity >= 0 ? remainingItemQuantity : 0;
        if (soldItemQuantity > 0) {
          // Add the sold item to the customer order
          const customerOrderItem = {
            id: updatedItem.id,
            itemName: updatedItem.itemName,
            soldItemQuantity: soldItemQuantity,
            soldItemMeasure: updatedItem.itemMeasure,
            soldItemPrice: updatedItem.itemPrice,
            soldItemTotalPrice: updatedItem.itemPrice * soldItemQuantity,
          };
          // Replace the item in the customerOrder array if it already exists because of the
          // event.target.value bugging out
          const itemIndex = customerOrder.findIndex(
            (item) => item.id === customerOrderItem.id
          );
          if (itemIndex >= 0) {
            const updatedOrder = [...customerOrder];
            updatedOrder[itemIndex] = customerOrderItem;
            setCustomerOrder(updatedOrder);
          } else {
            // Otherwise, add it to the end of the customerOrder array
            setCustomerOrder((prevOrder) => [...prevOrder, customerOrderItem]);
          }
        }
      } else {
        updatedItem[property] = event.target.value;
      }
      setSalesData(updatedSalesData);
    },
    [salesData, customerOrder]
  );

  console.log(customerOrder);

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
    axios
      .post("https://64095fb26ecd4f9e18aec05b.mockapi.io/Orders", {
        custName: props.customer,
        custPhone: props.phone,

        
        customerOrder,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Render the component
  return (
    <div className="sales-container fade-in">
      <br />
      <h1>Sales</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Measure</th>
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
                  type="text"
                  value={item.itemMeasure}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "itemMeasure")
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
