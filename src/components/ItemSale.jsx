import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);

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
    setSalesData(updatedSalesData);
  };

  const handleSave = () => {
    axios
      .put("https://64095fb26ecd4f9e18aec05b.mockapi.io/Sales", salesData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
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
              <td>{item.itemTotalPrice}</td>
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
