import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosRefreshToken from "../axios";

const DeliverymanInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await axiosRefreshToken.get(
        "/api/dashboard/deliveryman/parcels"
      );
      const results = await response.data;

      setParcels(results.parcels);
    };
    fetchParcels();
  }, []);

  const loggedInUser = localStorage.getItem("username");

  return (
    <div>
      <h3>
        {loggedInUser !== null ? loggedInUser.toUpperCase() : null}'s Inbox
      </h3>
      <h4>Accepted Jobs</h4>
      {parcels.length !== 0 &&
        parcels.map((parcel) => (
          <Link
            to={{
              pathname: `/deliverymaninbox/${parcel._id}`,
              state: {
                parcelId: parcel._id,
                parcelStatus: parcel.status,
                origin: parcel.location.origin,
                destination: parcel.location.destination,
                receivingCustomer: parcel.receiverDetails.name,
                username: parcel.deliveryman,
              },
            }}
          >
            <div className="parcel-deliveryman-show">
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
              <p>
                <b>Fee: </b>${parcel.quotation}
              </p>
            </div>
          </Link>
        ))}

      <Link to="/deliveryman">
        <button className="btn">Browse More Jobs</button>
      </Link>
    </div>
  );
};

export default DeliverymanInboxPage;
