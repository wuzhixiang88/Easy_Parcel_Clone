import React from "react";
import axiosRefreshToken from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  //   const response = fetch("/api/users/profile", {
  //     method: "GET",
  //   });
  //   console.log(response);

  return (
    <div>
      <h3>My Profile</h3>

      <div>
        <li>Username: {localStorage.username}</li>
        <li>My Role: {localStorage.role}</li>
      </div>
    </div>
  );
};

export default Profile;
