import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axiosRefreshToken from "../axios";

const DeliveryRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const { origin, destination, parcelId } = location.state;

  const handleClickAccept = async () => {
    const response = await axiosRefreshToken({
      url: `/api/dashboard/deliveryman/allparcels/${parcelId}`,
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.statusText === "OK") {
      history.push("/deliverymaninbox");
    }
  };

  return (
    <>
      <div>
        <h3>Map Route</h3>
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
      <div>
        <Link to="/deliveryman">
          <button className="btn">Back </button>
        </Link>

        <button className="btn" onClick={handleClickAccept}>
          Accept
        </button>
      </div>
    </>
  );
};

export default DeliveryRoute;
