import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await fetch("/api/dashboard/deliveryman/allparcels");
      const results = await response.json();
      setParcels(results.parcels);
    };

    fetchParcels();
  }, []);

  const loggedInUser = localStorage.getItem("username");

  return (
    <div>
      <h3>
        Welcome {loggedInUser !== null ? loggedInUser.toUpperCase() : null}!
      </h3>
      <h4>Available Parcels</h4>
      {parcels.length !== 0 &&
        parcels.map((parcel) => (
          <Link
            to={{
              pathname: "/route",
              state: {
                origin: parcel.location.origin,
                destination: parcel.location.destination,
                parcelId: parcel._id,
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
    </div>
  );
};

export default CustomerInboxPage;
