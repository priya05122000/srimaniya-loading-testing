import React from "react";
import CareerSection from "./components/CareerSection";
import ApplyNow from "./components/ApplyNow";

const CareerPage = () => {
  return (
    <div>
      <CareerSection />
      <div id="apply-now-section">
        <ApplyNow />
      </div>
    </div>
  );
};

export default CareerPage;
