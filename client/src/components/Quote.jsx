import React, { useState } from "react";

//distance to be taken from API (distance between 2 postcodes)
//standardRate is a constant set by us
const standardRate = 0.3;
const standardSpeed = 1.5;
// const quotation = distance * parcelWeight * standardRate;
// const duration = distance * standardSpeed;

const Quote = () => {
  const [distance, setDistance] = useState(0);
  const [parcelWeight, setParcelWeight] = useState(0);
  const [quotation, setQuotation] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleDistanceInput = (e) => {
    console.log(e.target.value);
    setDistance(e.target.value);
  };

  const handleParcelWeightInput = (e) => {
    console.log(e.target.value);
    setParcelWeight(e.target.value);
  };

  const handleClickRequestQuotation = () => {
    console.log(distance, parcelWeight);
    setQuotation(distance * (parcelWeight / 1.2) * standardRate);
    setDuration(distance * standardSpeed);
  };

  return (
    <div>
      <div id="quote">
        <h3>quote component</h3>

        <input type="text" placeholder="Origin Postcode" />
        <br />

        <input type="text" placeholder="Destination Postcode" />
        <br />

        <input
          type="number"
          placeholder="Distance (testing)"
          value={distance}
          onChange={handleDistanceInput}
        />
        <br />

        <input
          type="number"
          placeholder="Parcel Weight (KG)"
          value={parcelWeight}
          onChange={handleParcelWeightInput}
        />
        <br />
        <button onClick={handleClickRequestQuotation}>Quote</button>
        <br />
      </div>
    </div>
  );
};

export default Quote;
