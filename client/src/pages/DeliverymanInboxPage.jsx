import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryRoute from "../components/DeliveryRoute";

const DeliverymanInboxPage = () => {
  return (
    <div>
      <h2>Deliveryman Inbox Page</h2>
      <DeliveryRoute />
      <ul>
        Your accepted jobs
        <li>
          Woodlands to Sentosa<button>Update Status</button>
        </li>
        <li>
          Tuas to Changi<button>Update Status</button>
        </li>
      </ul>

      <Link to="/deliveryman">
        <button>Browse More Jobs</button>
      </Link>
    </div>
  );
};

export default DeliverymanInboxPage;
