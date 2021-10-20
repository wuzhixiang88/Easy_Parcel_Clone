import React, { useState } from "react";
import Quote from "../components/Quote";
import ShowQuote from "../components/ShowQuote";
import BookingDetails from "../components/BookingDetails";

const CustomerPage = () => {
  const [showPage, setShowPage] = useState({
    showQuote: false,
    showBookingDetails: false,
  });
  const [location, setLocation] = useState({
    origin: "",
    destination: "",
  });
  const [quotation, setQuotation] = useState("");
  const [duration, setDuration] = useState("");
  const [parcelWeight, setParcelWeight] = useState("");

  const loggedInUser = localStorage.getItem("username");

  return (
    <div id="customer-page">
      <h3>
        Welcome {loggedInUser !== null ? loggedInUser.toUpperCase() : null}!{" "}
      </h3>
      <Quote
        setQuotation={setQuotation}
        setDuration={setDuration}
        setLocation={setLocation}
        parcelWeight={parcelWeight}
        setParcelWeight={setParcelWeight}
        setShowPage={setShowPage}
        showpage={showPage}
      />

      {showPage.showQuote ? (
        <ShowQuote
          quotation={quotation}
          duration={duration}
          setShowPage={setShowPage}
        />
      ) : null}
      {showPage.showBookingDetails ? (
        <BookingDetails
          location={location}
          quotation={quotation}
          duration={duration}
          parcelWeight={parcelWeight}
        />
      ) : null}
    </div>
  );
};

export default CustomerPage;
