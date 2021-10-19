import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const BookingDetails = ({ location, quotation, duration, parcelWeight }) => {
  const [senderDetails, setSenderDetails] = useState({
    senderName: "",
    senderEmailAddress: "",
    senderContactNum: "",
    senderUnitNum: "",
  });

  const [receiverDetails, setReceiverDetails] = useState({
    receiverName: "",
    receiverEmailAddress: "",
    receiverContactNum: "",
    receiverUnitNum: "",
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
          unitNum: senderDetails.senderUnitNum,
        },
        receiverDetails: {
          name: receiverDetails.receiverName,
          emailAddress: receiverDetails.receiverEmailAddress,
          contactNumber: receiverDetails.receiverContactNum,
          unitNum: receiverDetails.receiverUnitNum,
        },
      }),
    });

    if (response.ok) {
      history.push("/customerinbox");
    }
  };

  return (
    <div id="bookingdetails">
      <h4 className="quote-header">Complete your booking</h4>
      <div>Sender details</div>
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
      </div>
      <div>
        <input
          name="senderContactNum"
          placeholder="Contact No."
          value={senderDetails.contactNum}
          onChange={handleInputChange}
        />
        <input
          name="senderUnitNum"
          placeholder="Unit No."
          value={senderDetails.unitNum}
          onChange={handleInputChange}
        />
      </div>

      <div>Receiver details</div>
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
      </div>
      <div>
        <input
          name="receiverContactNum"
          placeholder="Contact No."
          value={receiverDetails.contactNum}
          onChange={handleInputChange}
        />
        <input
          name="receiverUnitNum"
          placeholder="Unit No."
          value={receiverDetails.unitNum}
          onChange={handleInputChange}
        />
      </div>

      <div>Parcel details</div>
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
