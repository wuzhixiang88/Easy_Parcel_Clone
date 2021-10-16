import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await fetch("/api/dashboard/deliveryman/allparcels");
      const results = await response.json();
      console.log(results.parcels);
      setParcels(results.parcels);
    };

    fetchParcels();
  }, []);

  return (
    <div>
      <h2>Deliveryman Page</h2>
      <h4>Available Parcels</h4>
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
            <p>
              <b>Fee: </b>${parcel.quotation}
            </p>
          </div>
        ))}
      <Link to="/deliverymaninbox">
        <button>View my accepted parcels</button>
      </Link>
    </div>
  );
};

export default CustomerInboxPage;
