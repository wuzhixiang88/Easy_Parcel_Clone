import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  return (
    <div>
      <h2>Customer Inbox Page</h2>

      <ul>
        Your Parcels
        <li>Parcel E: Tanjong Pagar to Punggol - Booked</li>
        <li>Parcel C: Yishun to Clementi - In Transit</li>
        <li>Parcel D: Bedok to Ang Mo Kio - Received</li>
      </ul>
      <p>
        <i>Parcel Statuses: Booked → Accepted → In Transit → Received</i>
      </p>

      <Link to="/customer">
        <button>Book another parcel</button>
      </Link>
    </div>
  );
};

export default CustomerInboxPage;
