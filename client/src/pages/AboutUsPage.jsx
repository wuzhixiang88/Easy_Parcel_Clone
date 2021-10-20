import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <h3>About EZ Package</h3>
      <div className="about-us-div">
        <img
          className="images"
          src="https://i.imgur.com/tZqZIhB.png"
          alt="..."
          width="400"
        />

        <p className="about-us-para">
          We are a homegrown delivery app and have been operating since 2021.
          Building on contemporary management theories that advocate variance
          reduction as the critical step in improving the overall performance of
          a system, we model the variance of delivery time to the final customer
          as a function of the investment to reduce delivery variance and the
          costs associated with untimely delivery (expected earliness and
          lateness). A logarithmic investment function is used and the model
          solution involves the minimization of a convex–concave total cost
          function. A numerical example is provided to illustrate the model and
          the solution procedure.
        </p>
      </div>

      <div className="about-us-div">
        <p className="about-us-para">
          We have grown from one bicycle to a fleet of 200 Merdedes Sprint vans
          in less than a year. A numerical example is provided to illustrate the
          model and the solution procedure. The model presented provides
          guidelines for determining the optimal level of financial investment
          for reducing delivery variance. The managerial implications as well as
          the economic aspects of delivery variance reduction in supply chain
          management are discussed.
        </p>
        <img
          className="images"
          src="https://i.imgur.com/8bCtIe9.png"
          alt="..."
          width="400"
        />
      </div>
      <div className="about-us-div">
        <img
          className="images"
          src="https://i.imgur.com/fEN6Mf7.png"
          alt="..."
          width="400"
        />

        <p className="about-us-para">
          We are customer centric and always place your needs above ours. The
          present worth of the expected costs, due to untimely delivery, that
          accrue over a finite time horizon provide management with input for
          justifying financial investment to support a continuous improvement
          program to reduce delivery variance. The concept of managerial neglect
          is introduced and quantified as an opportunity cost of management
          neglecting to improve delivery performance in a timely manner.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
