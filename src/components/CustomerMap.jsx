import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";

export default function ViewCustomerOnMap(props) {
  const { name, phone, email, streetName, city, state, zip, orders } = props;

  const [showModal, setShowModal] = useState(false);
  const [customerLocation, setCustomerLocation] = useState({});
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowModal = () => {
    // Show modal
    setShowModal(true);
  };

  // Create a function to show customer on map
  const showCustomerOnMap = async () => {
    const address = `${streetName}, ${city}, ${state} ${zip}`;
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${encodeURIComponent(
      address
    )}&key=AIzaSyC8psV1m5fNQ3Fho4No5UPVmwtl2YEalOk`;

    try {
      const response = await axios.get(geocodingApiUrl);
      const location = response.data.results[0].geometry.location;
      console.log(location);
      setCustomerLocation(location);
      handleShowModal();
    } catch (error) {
      console.error(error);
      setCustomerLocation({});
      setShowModal(false);
    }
  };

  const Map = () => (
    <GoogleMapReact
      apiKey="AIzaSyC8psV1m5fNQ3Fho4No5UPVmwtl2YEalOk"
      defaultCenter={customerLocation}
      defaultZoom={17}
    >
      <Marker
        lat={customerLocation.lat}
        lng={customerLocation.lng}
        text="My Marker"
      />
    </GoogleMapReact>
  );

  useEffect(() => {
    const fetchCustomerOrdersAPI = async () => {
      try {
        const response = await axios.get(
          `https://64095fb26ecd4f9e18aec05b.mockapi.io/orders`
        );
        setCustomerOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCustomerOrdersAPI();
  }, []);

  return (
    <div className="container fade-in">
      <Button onClick={showCustomerOnMap}>Show Location on Map</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{name}'s Location</Modal.Title>
        </Modal.Header>
        {customerLocation.lat && customerLocation.lng ? (
          <Modal.Body>
            <div style={{ height: "400px", width: "100%" }}>
              {isLoading ? <Spinner animation="border" /> : <Map />}
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            Loading map...
            <Map />
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
}
