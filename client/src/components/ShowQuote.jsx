import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ShowQuote = (props) => {
  const handleClickProceedQuotation = () => {
    props.setShowPage({
      showQuote: true,
      showBookingDetails: true,
    });
  };

  return (
    <div id="showquote">
      <h4 className="quote-header">We found the best rate for you!</h4>
      <table id="quote-table">
        <tbody id="quote-table-body">
          <tr className="quote-table-cells">
            <th className="quote-table-header">Company</th>
            <th className="quote-table-header">Service Type</th>
            <th className="quote-table-header">Estimated Duration</th>
            <th className="quote-table-header">Quotation</th>
          </tr>
          <tr>
            <td className="quote-table-cells">JKZ Transportation</td>
            <td className="quote-table-cells">Door-to-Door</td>
            <td className="quote-table-cells">{props.duration}</td>
            <td className="quote-table-cells">${props.quotation}</td>
          </tr>
        </tbody>
      </table>
      <Form.Group style={{ marginLeft: "-5px" }}>
        <Button variant="secondary" onClick={handleClickProceedQuotation}>
          Proceed
        </Button>
      </Form.Group>
    </div>
  );
};

export default ShowQuote;
