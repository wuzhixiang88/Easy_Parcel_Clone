import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerInboxPage = () => {
  const [parcels, setParcels] = useState([]);
  // useEffect(() => {
  //   const fetchParcels = async () => {
  //     const response = await fetch("/api/dashboard/customer/parcels");
  //     const results = await response.json();
  //     setParcels(results.parcels);
  //   };
  //   fetchParcels();
  // }, []);

  return (
    <div>
      <h2>Customer Inbox Page</h2>

      <div>
        <h2>Parcels</h2>
        {parcels.length !== 0 &&
          parcels.map((parcel) => (
            <div>
              <h3>{parcel.parcels}</h3>
              <p>
                From {parcel.parcels.sender}
                {/* {format(new Date(post.publishedDate), "dd MMM yyyy")} */}
              </p>
              <p>{parcel.parcels.content}</p>
            </div>
          ))}
      </div>

      <Link to="/customer">
        <button>Book another parcel</button>
      </Link>
    </div>
  );
};

export default CustomerInboxPage;
