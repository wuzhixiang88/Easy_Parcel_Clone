import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const DeliveryRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const { origin, destination, parcelId } = location.state;

  const handleClickAccept = async () => {
    const response = await fetch(
      `/api/dashboard/deliveryman/allparcels/${parcelId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      history.push("/deliverymaninbox");
    }
  };

  return (
    <>
      <div>
        <h2>Map Route</h2>
      </div>
      <Link to="/deliveryman">Back</Link>
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
      <div>
        <button onClick={handleClickAccept}>Accept</button>
      </div>
    </>
  );
};

export default DeliveryRoute;
