import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

// This component is used to display the sales data
// and to allow the user to edit the data
// and save it to the API
// I'm still working on the save function

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [soldItemQuantity, setSoldItemQuantity] = useState(0);
  const [soldItemPrice, setSoldItemPrice] = useState(0);
  const [soldItemTotalPrice, setSoldItemTotalPrice] = useState(0);
  const [soldItemName, setSoldItemName] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [itemQuantity, setItemQuantity] = useState(salesData.itemQuantity);

  

  useEffect(() => {
    axios
      .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCellChange = (event, rowIndex, property) => {
    const updatedSalesData = [...salesData];
    updatedSalesData[rowIndex][property] = event.target.value;
    updatedSalesData[rowIndex].ItemQuantity = updatedSalesData[rowIndex].ItemQuantity - updatedSalesData[rowIndex].soldItemQuantity;
    setSalesData(updatedSalesData);
    console.log(updatedSalesData);
    console.log(salesData);
    setSoldItemQuantity(updatedSalesData[rowIndex].soldItemQuantity);

    
  };

  const handleItemSold = (event) => {
    setSoldItemQuantity(event.target.value);
    
    item.itemQuantity = item.itemQuantity - soldItemQuantity;
  };



  const handleSave = () => {
    salesData.forEach(item => {
      const updatedQuantity = item.itemQuantity - item.soldItemQuantity;
      const updatedItem = { ...item, itemQuantity: updatedQuantity };
      axios
        .put(`https://64095fb26ecd4f9e18aec05b.mockapi.io/Inventory/${item.id}`, updatedItem)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  

  return (
    <>
      <h1>Sales</h1>
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
                  value={item.itemQuantity - item.soldItemQuantity}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "itemPrice")
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );
}

