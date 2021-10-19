import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Thread = () => {
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
      <Link to="/deliverymaninbox">
        <button>Back To Inbox</button>
      </Link>
      <div>Parcel ID: {parcelId}</div>
      <div>Deliver To: {receivingCustomer}</div>
      <div>
        {status === "Accepted" ? (
          <button onClick={handleClickTransit}>
            Update Parcel Status to "Transit"
          </button>
        ) : null}
        {status === "Transit" ? (
          <button onClick={handleClickDelivered}>
            Update Parcel Status to "Delivered"
          </button>
        ) : null}
        {status === "Delivered" ? (
          <button disabled>Job Completed</button>
        ) : null}
      </div>
      <div>
        <iframe
          title="Route"
          width="800"
          height="500"
          loading="lazy"
          allowfullscreen
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GMAP_API_KEY}&origin=${origin}&destination=${destination}`}
        ></iframe>
      </div>
      <div>TO DISPLAY CHAT MESSAGES HERE</div>
      <div>
        <input
          type="text"
          name="message"
          autofocus="autofocus"
          placeholder="Type here..."
        />
        <button type="submit">Send</button>
      </div>
    </>
  );
};

export default Thread;
