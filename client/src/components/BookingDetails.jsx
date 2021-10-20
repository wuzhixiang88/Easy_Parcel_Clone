import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const { senderName, senderEmailAddress, senderContactNum, senderUnitNum } =
      senderDetails;
    const {
      receiverName,
      receiverEmailAddress,
      receiverContactNum,
      receiverUnitNum,
    } = receiverDetails;
    const { content, value } = parcelDetails;
    const newErrors = {};

    // sender details errors
    if (!senderName || senderName === "") {
      newErrors.senderName = "Sender name cannot be blank!";
    } else if (senderName.length > 20) {
      newErrors.senderName = "Sender name is too long!";
    }
    if (!senderEmailAddress || senderEmailAddress === "") {
      newErrors.senderEmailAddress = "Sender email address cannot be blank!";
    }
    if (!senderContactNum || senderContactNum === "") {
      newErrors.senderContactNum = "Sender contact number cannot be blank!";
    }
    if (!senderUnitNum || senderUnitNum === "") {
      newErrors.senderUnitNum = "Sender unit number cannot be blank!";
    }

    // receiver details errors
    if (!receiverName || receiverName === "") {
      newErrors.receiverName = "Receiver name cannot be blank!";
    } else if (senderName.length > 20) {
      newErrors.receiverName = "Receiver name is too long!";
    }
    if (!receiverEmailAddress || receiverEmailAddress === "") {
      newErrors.receiverEmailAddress =
        "Receiver email address cannot be blank!";
    }
    if (!receiverContactNum || receiverContactNum === "") {
      newErrors.receiverContactNum = "Receiver contact number cannot be blank!";
    }
    if (!receiverUnitNum || receiverUnitNum === "") {
      newErrors.receiverUnitNum = "Receiver unit number cannot be blank!";
    }

    // parcel details and date errors
    if (!content || content === "") {
      newErrors.content = "Please provide parcel content!";
    } else if (content.length > 20) {
      newErrors.content = "Parcel content cannot exceed 20 characters!";
    }
    if (!value || value === "") {
      newErrors.value = "Please provide parcel value!";
    }
    if (!pickUpDate || pickUpDate === "") {
      newErrors.date = "Please provide a pickup date!";
    }

    return newErrors;
  };

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

    if (!!errors[key]) {
      setErrors({
        ...errors,
        [key]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
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
    }
  };

  const style = {
    color: "red",
    marginLeft: "0.5rem",
  };

  return (
    <div id="bookingdetails">
      <Form className="form">
        <h4 className="quote-header">Complete your booking</h4>
        <h5>Sender Details</h5>
        <Form.Group>
          <Form.Control
            type="text"
            name="senderName"
            placeholder="Sender Name"
            value={senderDetails.senderName}
            onChange={handleInputChange}
            isInvalid={!!errors.senderName}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.senderName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="senderEmailAddress"
            placeholder="Email Address"
            value={senderDetails.emailAddress}
            onChange={handleInputChange}
            isInvalid={!!errors.senderEmailAddress}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.senderEmailAddress}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="senderContactNum"
            placeholder="Contact No."
            value={senderDetails.contactNum}
            onChange={handleInputChange}
            isInvalid={!!errors.senderContactNum}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.senderContactNum}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="senderUnitNum"
            placeholder="Unit No."
            value={senderDetails.unitNum}
            onChange={handleInputChange}
            isInvalid={!!errors.senderUnitNum}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.senderUnitNum}
          </Form.Control.Feedback>
        </Form.Group>

        <h5>Receiver Details</h5>
        <Form.Group>
          <Form.Control
            type="text"
            name="receiverName"
            placeholder="Receiver Name"
            value={receiverDetails.receiverName}
            onChange={handleInputChange}
            isInvalid={!!errors.receiverName}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.receiverName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="receiverEmailAddress"
            placeholder="Email Address"
            value={receiverDetails.emailAddress}
            onChange={handleInputChange}
            isInvalid={!!errors.receiverEmailAddress}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.receiverEmailAddress}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="receiverContactNum"
            placeholder="Contact No."
            value={receiverDetails.contactNum}
            onChange={handleInputChange}
            isInvalid={!!errors.receiverContactNum}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.receiverContactNum}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="receiverUnitNum"
            placeholder="Unit No."
            value={receiverDetails.unitNum}
            onChange={handleInputChange}
            isInvalid={!!errors.receiverUnitNum}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.receiverUnitNum}
          </Form.Control.Feedback>
        </Form.Group>

        <h5>Parcel Details</h5>
        <Form.Group>
          <Form.Control
            type="text"
            name="content"
            placeholder="Parcel Content"
            value={parcelDetails.content}
            onChange={handleInputChange}
            isInvalid={!!errors.content}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.content}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            name="value"
            placeholder="Parcel Value"
            value={parcelDetails.price}
            onChange={handleInputChange}
            isInvalid={!!errors.value}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.value}
          </Form.Control.Feedback>
        </Form.Group>

        <h5>Pickup Date</h5>
        <Form.Group>
          <Form.Control
            type="date"
            name="date"
            value={pickUpDate}
            onChange={handleInputChange}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type="invalid" style={style}>
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={{ marginLeft: "-5px" }}>
          <Button type="submit" variant="secondary" onClick={handleSubmit}>
            Confirm Order
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BookingDetails;

<Link to="/customerinbox" />;
