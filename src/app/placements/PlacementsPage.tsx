import React from "react";
import PlacementInfo from "./components/PlacementInfo";
import PlacementStats from "./components/PlacementStats";
import PartTimeStudentsInfo from "./components/PartTimeStudentsInfo";
import PartPlacementPartners from "./components/PartPlacementPartners";
import PartBanner from "./components/PartBanner";
import PlacedStudentsInfo from "./components/PlacedStudentsInfo";

const PlacementsPage = () => {
    return (
        <div>
            <PartBanner />
            <PlacementInfo />
            <PlacementStats />
            <PlacedStudentsInfo />
            <PartTimeStudentsInfo />
            <PartPlacementPartners />
        </div>
    );
};

export default PlacementsPage;
