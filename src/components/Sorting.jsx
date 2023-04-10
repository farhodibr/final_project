import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import '../App.css';
import GetItem from "./GetItemAPI";

export default function Sorting() {
  
  itemSorting = (item)  => { 
    item.sort(function (a, b) {
      if (a.itemName < b.itemName) {
        return -1;
      }
      if (a.itemName > b.itemName) {
        return 1;
      }
      return 0;
    });

  return (    
    <GetItem itemSorting={itemSorting} /> 
  );
}
}
