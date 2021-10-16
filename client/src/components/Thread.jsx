import React from "react";
import { Link, useLocation } from "react-router-dom";

const Thread = () => {
  const location = useLocation();
  const { origin, destination, parcelId, receivingCustomer } = location.state;

  return (
    <>
      <Link to="/deliverymaninbox">Back</Link>
      <div>Parcel ID: {parcelId}</div>
      <div>Delivering To: {receivingCustomer}</div>
      <div>
        <iframe
          title="Route"
          width="600"
          height="450"
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
