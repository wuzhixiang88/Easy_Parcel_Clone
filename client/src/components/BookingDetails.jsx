import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const BookingDetails = ({ location, quotation, duration, parcelWeight }) => {
  const [senderDetails, setSenderDetails] = useState({
    senderName: "",
    senderEmailAddress: "",
    senderContactNum: "",
    senderAddress: "",
    senderUnitNum: "",
    senderPostal: "",
  });

  const [receiverDetails, setReceiverDetails] = useState({
    receiverName: "",
    receiverEmailAddress: "",
    receiverContactNum: "",
    receiverAddress: "",
    receiverUnitNum: "",
    receiverPostal: "",
  });

  const [parcelDetails, setParcelDetails] = useState({
    content: "",
    value: "",
  });

  const [pickUpDate, setPickUpDate] = useState("");

  const history = useHistory();

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setSenderDetails({
      ...senderDetails,
      [key]: value,
    });

    setReceiverDetails({
      ...receiverDetails,
      [key]: value,
    });

    setParcelDetails({
      ...parcelDetails,
      [key]: value,
    });

    if (key === "date") {
      setPickUpDate(value);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/dashboard/customer/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: "Booked",
        location: location,
        quotation: quotation,
        duration: duration,
        parcelDetails: {
          content: parcelDetails.content,
          weightKg: parcelWeight,
          value: parcelDetails.value,
        },
        senderDetails: {
          name: senderDetails.senderName,
          emailAddress: senderDetails.senderEmailAddress,
          contactNumber: senderDetails.senderContactNum,
          address: senderDetails.senderAddress,
          unitNum: senderDetails.senderUnitNum,
          postalCode: senderDetails.senderPostal,
        },
        receiverDetails: {
          name: receiverDetails.receiverName,
          emailAddress: receiverDetails.receiverEmailAddress,
          contactNumber: receiverDetails.receiverContactNum,
          address: receiverDetails.receiverAddress,
          unitNum: receiverDetails.receiverUnitNum,
          postalCode: receiverDetails.receiverPostal,
        },
      }),
    });

    if (response.ok) {
      history.push("/customerinbox");
    }
  };

  return (
    <div id="bookingdetails">
      <h3>booking details component</h3>
      <div>Fill in sender details</div>
      <div>
        <input
          name="senderName"
          placeholder="Sender Name"
          value={senderDetails.senderName}
          onChange={handleInputChange}
        />
        <input
          name="senderEmailAddress"
          placeholder="Email Address"
          value={senderDetails.emailAddress}
          onChange={handleInputChange}
        />
        <input
          name="senderContactNum"
          placeholder="Contact No."
          value={senderDetails.contactNum}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          name="senderAddress"
          placeholder="Address"
          value={senderDetails.address}
          onChange={handleInputChange}
        />
        <input
          name="senderUnitNum"
          placeholder="Unit No."
          value={senderDetails.unitNum}
          onChange={handleInputChange}
        />
        <input
          name="senderPostal"
          placeholder="Postal"
          value={senderDetails.postal}
          onChange={handleInputChange}
        />
      </div>

      <div>Fill in receiver details</div>
      <div>
        <input
          name="receiverName"
          placeholder="Receiver Name"
          value={receiverDetails.receiverName}
          onChange={handleInputChange}
        />
        <input
          name="receiverEmailAddress"
          placeholder="Email Address"
          value={receiverDetails.emailAddress}
          onChange={handleInputChange}
        />
        <input
          name="receiverContactNum"
          placeholder="Contact No."
          value={receiverDetails.contactNum}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          name="receiverAddress"
          placeholder="Address"
          value={receiverDetails.address}
          onChange={handleInputChange}
        />
        <input
          name="receiverUnitNum"
          placeholder="Unit No."
          value={receiverDetails.unitNum}
          onChange={handleInputChange}
        />
        <input
          name="receiverPostal"
          placeholder="Postal"
          value={receiverDetails.postal}
          onChange={handleInputChange}
        />
      </div>

      <div>Fill in parcel details</div>
      <div>
        <input
          name="content"
          placeholder="Parcel Content"
          value={parcelDetails.content}
          onChange={handleInputChange}
        />
        <input
          name="value"
          placeholder="Parcel Value"
          value={parcelDetails.price}
          onChange={handleInputChange}
        />
      </div>

      <div>Select a date</div>
      <div>
        <input
          type="date"
          name="date"
          value={pickUpDate}
          onChange={handleInputChange}
        />
      </div>

      <div>
        {/* <Link to="/customerinbox"> */}
        <button onClick={handleSubmit}>Confirm Order</button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default BookingDetails;

<Link to="/customerinbox" />;
