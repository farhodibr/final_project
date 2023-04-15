import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateItem from './CreateItem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';


export default function ItemMeasure() {
  const [itemMeasure, setItemMeasure] = useState('');

  const handleSelect = (e) => {
    setItemMeasure(e)   
  };
  console.log(itemMeasure)
  return (
    <Dropdown>
   
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Item Measurement
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >
          <Button type='submit'
           onClick={(e) => setItemMeasure('pcs')}>
            pcs
            </Button> 
          </Dropdown.Item>
        
      </Dropdown.Menu>
    
    </Dropdown>
  );
}

