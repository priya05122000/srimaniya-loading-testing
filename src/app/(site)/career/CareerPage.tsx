import React from "react";
import CareerSection from "./components/CareerSection";
import ApplyNow from "./components/ApplyNow";

const CareerPage = ({ jobs }: any) => {
  return (
    <div>
      <CareerSection jobs={jobs} />
      <div id="apply-now-section">
        <ApplyNow />
      </div>
    </div>
  );
};

export default CareerPage;