import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  return (
    <div>
      <h2>Customer Inbox Page</h2>
      <h4>Parcel Status - Booked</h4>
      <p>A deliveryman will soon be in touch</p>
      <ul>
        Parcel Statuses
        <li>Booked</li>
        <li>Accepted</li>
        <li>In Transit</li>
        <li>Received</li>
        <li>Complete</li>
      </ul>

      <Link to="/customer">
        <button>Book another parcel</button>
      </Link>
    </div>
  );
};

export default CustomerInboxPage;
