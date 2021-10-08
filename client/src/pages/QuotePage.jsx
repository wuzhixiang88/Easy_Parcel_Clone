import React, { useState } from "react";

//distance to be taken from API (distance between 2 postcodes)
//standardRate is a constant set by us
const standardRate = 0.5;
const standardSpeed = 5;
// const quotation = distance * parcelWeight * standardRate;
// const duration = distance * standardSpeed;

const QuotePage = () => {
  const [distance, setDistance] = useState(0);
  const [parcelWeight, setParcelWeight] = useState(0);
  const [quotation, setQuotation] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleDistanceInput = (e) => {
    setDistance(e.target.value);
  };

  const handleParcelWeightInput = (e) => {
    setParcelWeight(e.target.value);
  };

  const handleClickRequestQuotation = () => {
    console.log("quotation requested");
    setQuotation(parcelWeight * standardRate);
    setDuration(distance * standardSpeed);
  };

  return (
    <div>
      <div id="quote-input">
        <h1>Quote Page</h1>
        <label for="Origin">Origin Postcode</label>
        <input type="text" />
        <br />
        <label for="Destination">Destination Postcode</label>
        <input type="text" />
        <br />
        <label for="Distance">Distance (testing)</label>
        <input type="number" onChange={handleDistanceInput} />
        <br />
        <label for="Weight">Parcel Weight in KG</label>
        <input type="number" onChange={handleParcelWeightInput} />
        <br />
        <button onClick={handleClickRequestQuotation}>Quote</button>
        <br />
      </div>
      <div id="quote-show">
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
            <td>{duration} mins</td>
            <td>${quotation}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default QuotePage;
