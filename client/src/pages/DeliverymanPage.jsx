import React from "react";
import DeliveryRoute from "../components/DeliveryRoute";

const DeliverymanPage = () => {
  return (
    <div>
      <h2>Welcome --Deliveryman Name-- </h2>
      <DeliveryRoute />

      <ul>
        <li>
          Parcel A: Bukit Panjang to Tanjong Pagar<button>Preview Route</button>
          <button>Accept</button>
        </li>
        <li>
          Parcel B: Tampines to Bukit Timah<button>Preview Route</button>
          <button>Accept</button>
        </li>
      </ul>
    </div>
  );
};

export default DeliverymanPage;
