import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";

const DeliverymanThread = () => {
  const location = useLocation();
  const { parcelId, parcelStatus, origin, destination, receivingCustomer } =
    location.state;

  const [status, setStatus] = useState(parcelStatus);

  const handleClickTransit = async () => {
    const response = await fetch(
      `/api/dashboard/deliveryman/parcels/${parcelId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          status: "Transit",
        }),
      }
    );

    if (response.ok) {
      setStatus("Transit");
    }
  };

  const handleClickDelivered = async () => {
    const response = await fetch(
      `/api/dashboard/deliveryman/parcels/${parcelId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          status: "Delivered",
        }),
      }
    );

    if (response.ok) {
      setStatus("Delivered");
    }
  };

  return (
    <>
      <Container style={{ width: "800px" }}>
        <Row>
          <Link to="/deliverymaninbox">
            <Button variant="secondary" style={{ marginLeft: "0" }}>
              Back To Inbox
            </Button>
          </Link>
        </Row>
        <Row>
          <h3>Parcel ID: {parcelId}</h3>
        </Row>
        <Row>
          <h4>Current Status: {status}</h4>
        </Row>
        <Row>
          <h5>Receiving Customer: {receivingCustomer}</h5>
        </Row>
        <Row>
          <iframe
            title="Route"
            width="800"
            height="500"
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GMAP_API_KEY}&origin=${origin}&destination=${destination}`}
          ></iframe>
        </Row>
        <Row>
          {status === "Accepted" ? (
            <Button
              variant="success"
              onClick={handleClickTransit}
              style={{ marginLeft: "0" }}
            >
              Update Parcel Status to "Transit"
            </Button>
          ) : null}
          {status === "Transit" ? (
            <Button
              variant="success"
              onClick={handleClickDelivered}
              style={{ marginLeft: "0" }}
            >
              Update Parcel Status to "Delivered"
            </Button>
          ) : null}
          {status === "Delivered" ? (
            <Button disabled variant="dark" style={{ marginLeft: "0" }}>
              Job Completed
            </Button>
          ) : null}
        </Row>
        {/* <br />
        <Row>
          <div>TO DISPLAY CHAT MESSAGES HERE</div>
        </Row>
        <Row>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              name="message"
              autofocus="autofocus"
              placeholder="Type here..."
            />
            <Button variant="outline-secondary" style={{ marginLeft: "0" }}>
              Send
            </Button>
          </InputGroup>
        </Row> */}
      </Container>
    </>
  );
};

export default DeliverymanThread;
