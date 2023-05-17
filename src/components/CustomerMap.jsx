import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";


export default function ViewCustomerOnMap(props) {
  const { name, streetName, city, state, zip } = props;

  const [showModal, setShowModal] = useState(false);
  const [customerLocation, setCustomerLocation] = useState({});
  const [APIkey, setAPIkey] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const handleShowModal = () => {
    // Show modal
    setShowModal(true);
  };

  useEffect(
    () =>
      axios
        .get("https://64095fb26ecd4f9e18aec05b.mockapi.io/APIkey")
        .then((response) => {
          setAPIkey(response.data);
          console.log(APIkey);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        }),
    []
  );

  // Create a function to show customer on map
  const showCustomerOnMap = async () => {
    const address = `${streetName}, ${city}, ${state} ${zip}`;
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${encodeURIComponent(
      address
    )}&key=${APIkey[0].key}`;

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
  console.log(customerLocation);

  const Map = () => (
    <div style={{ height: "400px", width: "100%" }} className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIkey[0].key }}
        
        defaultCenter={customerLocation}
        defaultZoom={15}
        onTilesLoaded={() => setIsMapLoading(false)}
      >
        <Marker
          lat={customerLocation.lat}
          lng={customerLocation.lng}
          text="My Marker"
          icon="fas fa-map-marker-alt"
        />
      </GoogleMapReact>
      {isMapLoading && <Spinner animation="border" />}
    </div>
  );

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
          
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
}
