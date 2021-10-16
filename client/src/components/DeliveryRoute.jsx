import React from "react";
import { Link, useLocation } from "react-router-dom";

const DeliveryRoute = () => {
  const location = useLocation();
  const { origin, destination } = location.state;

  return (
    <>
      <div>
        <h2>Map Route</h2>
      </div>
      <Link to="/deliveryman">Back</Link>
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
      <div>
        <button>Accept</button>
      </div>
    </>
  );
};

export default DeliveryRoute;
