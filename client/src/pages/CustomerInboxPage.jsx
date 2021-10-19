import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await fetch("/api/dashboard/customer/parcels");
      const results = await response.json();

      setParcels(results.parcels);
    };
    fetchParcels();
  }, []);

  const loggedInUser = localStorage.getItem("username");

  return (
    <div>
      <h3>{loggedInUser}'s inbox</h3>
      <h4>Your Parcels</h4>
      {parcels.length !== 0 &&
        parcels.map((parcel) => (
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
        ))}

      <Link to="/customer">
        <button className="btn">Book another parcel</button>
      </Link>
    </div>
  );
};

export default CustomerInboxPage;
