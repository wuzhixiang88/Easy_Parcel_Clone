import React, { useState } from "react";

const BookingDetails = () => {
  const [senderDetails, setSenderDetails] = useState({
    senderName: "",
    emailAddress: "",
    contactNum: "",
    address: "",
    unitNum: "",
    postal: "",
  });

  const [receiverDetails, setReceiverDetails] = useState({
    receiverName: "",
    emailAddress: "",
    contactNum: "",
    address: "",
    unitNum: "",
    postal: "",
  });

  const [parcelDetails, setParcelDetails] = useState({
    content: "",
    price: "",
  });

  const [pickUpDate, setPickUpDate] = useState("");

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

    setPickUpDate(value);

    console.log("senderDetails - " + senderDetails.senderName);
    console.log("receiverDetails - " + receiverDetails.receiverName);
    console.log("date - " + pickUpDate);
  };

  const handleSubmit = async (e) => {
    // to post to server database for order details
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
          name="price"
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
        <button onClick={handleSubmit}>Confirm Order</button>
      </div>
    </div>
  );
};

export default BookingDetails;
