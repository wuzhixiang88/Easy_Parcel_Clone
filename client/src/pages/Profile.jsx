import React, { useState, useEffect } from "react";
import axiosRefreshToken from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const response = await axiosRefreshToken.get("/api/users/profile", {
        method: "GET",
      });
      const result = await response.data;
      setProfileDetails(result.user);
    };
    getProfile();
  }, []);

  return (
    <div>
      <h3>My Profile</h3>

      <div>
        <li>Username: {profileDetails.username}</li>
        <li>Email: {profileDetails.email}</li>
      </div>
    </div>
  );
};

export default Profile;
