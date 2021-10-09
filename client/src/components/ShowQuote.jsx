import React from "react";

const ShowQuote = (props) => {
  const handleClickProceedQuotation = () => {
    props.setShowPage({
      showQuote: true,
      showBookingDetails: true,
    });
  };

  return (
    <div id="showquote">
      <h3>show quote component</h3>
      <table id="quote-table">
        <tr>
          <th>Company</th>
          <th>Service Type</th>
          <th>Estimated Duration</th>
          <th>Quotation</th>
        </tr>
        <tr>
          <td>JKZ Transportation</td>
          <td>Door-to-Door</td>
          <td>{props.duration} mins</td>
          <td>${props.quotation}</td>
        </tr>
      </table>
      <button onClick={handleClickProceedQuotation}>Proceed</button>
    </div>
  );
};

export default ShowQuote;
