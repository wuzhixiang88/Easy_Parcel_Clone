import React from "react";
// import axiosRefreshToken from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  // const response = await axiosRefreshToken.get("/api/users/profile", {
  //   method: "GET",
  // });
  // const userProfile = response.data.user;

  return (
    <div>
      <h3>My Profile</h3>

      <div>
        <li>Username: </li>
        <li>My Role: </li>
      </div>
    </div>
  );
};

export default Profile;
