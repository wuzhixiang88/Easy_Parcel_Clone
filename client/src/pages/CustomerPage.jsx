import React, { useState } from "react";
import Quote from "../components/Quote";
import ShowQuote from "../components/ShowQuote";
import BookingDetails from "../components/BookingDetails";

const CustomerPage = () => {
  const [showPage, setShowPage] = useState({
    showQuote: false,
    showBookingDetails: false,
  });
  const [quotation, setQuotation] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div>
      <h2>Welcome --Customer Name-- </h2>
      <Quote
        setQuotation={setQuotation}
        setDuration={setDuration}
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
        <BookingDetails quotation={quotation} duration={duration} />
      ) : null}
    </div>
  );
};

export default CustomerPage;
