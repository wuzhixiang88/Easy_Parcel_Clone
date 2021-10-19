import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DeliverymanInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fetchParcels = async () => {
      const response = await fetch("/api/dashboard/deliveryman/parcels");
      const results = await response.json();

      setParcels(results.parcels);
    };
    fetchParcels();
  }, []);

  return (
    <div>
      <h2>Deliveryman Inbox Page</h2>
      <h4>Your Accepted Jobs</h4>
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
              <p>
                <b>Fee: </b>${parcel.quotation}
              </p>
            </div>
          </Link>
        ))}

      <Link to="/deliveryman">
        <button>Browse More Jobs</button>
      </Link>
    </div>
  );
};

export default DeliverymanInboxPage;
