import React, { useState } from "react";
import Quote from "../components/Quote";
import ShowQuote from "../components/ShowQuote";
import BookingDetails from "../components/BookingDetails";

const CustomerPage = () => {
  const [bookingstatus, setBookingstatus] = useState("quote");

  return (
    <div>
      <h2>Welcome --Customer Name-- </h2>
      <Quote bookingstatus={bookingstatus} />
      <ShowQuote />
      <BookingDetails />
    </div>
  );
};

export default CustomerPage;
