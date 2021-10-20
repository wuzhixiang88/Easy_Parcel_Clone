import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosRefreshToken from "../axios"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CustomerInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await axiosRefreshToken.get("/api/dashboard/customer/parcels");
      const results = await response.data

      setParcels(results.parcels);
    };
    fetchParcels();
  }, []);

  const loggedInUser = localStorage.getItem("username");

  return (
    <Container style={{ width: "800px" }}>
      <Row>
        <h3>
          {loggedInUser !== null ? loggedInUser.toUpperCase() : null}'s Inbox
        </h3>
      </Row>
      <Row>
        <h4>Your Parcels</h4>
      </Row>
      <Row>
        <Col style={{ marginLeft: "-10px" }}>
          {parcels.length !== 0 &&
            parcels.map((parcel) => (
              <Link
                to={{
                  pathname: `/customerinbox/${parcel._id}`,
                  state: {
                    parcelId: parcel._id,
                    parcelStatus: parcel.status,
                    origin: parcel.location.origin,
                    destination: parcel.location.destination,
                    deliveryman: parcel.deliveryman,
                  },
                }}
              >
                <div className="parcel-customer-show">
                  <p>
                    <b>Parcel ID: </b>
                    {parcel._id}
                  </p>
                  <p>
                    <b>Status: </b>
                    {parcel.status}
                  </p>
                  <p>
                    <b>From: </b>
                    {JSON.stringify(parcel.location.origin)}
                  </p>
                  <p>
                    <b>To: </b>
                    {JSON.stringify(parcel.location.destination)}
                  </p>
                </div>
              </Link>
            ))}
        </Col>
      </Row>
      <Row>
        <Link to="/customer">
          <Button variant="secondary" style={{ marginLeft: "0" }}>
            Book another parcel
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default CustomerInboxPage;
