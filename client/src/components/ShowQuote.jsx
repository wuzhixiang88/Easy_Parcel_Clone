import React from "react";

const ShowQuote = () => {
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
          <td>--duration-- mins</td>
          <td>$--quotation--</td>
        </tr>
      </table>
      <button>Proceed</button>
    </div>
  );
};

export default ShowQuote;
