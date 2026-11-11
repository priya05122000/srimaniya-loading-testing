import PlacementInfo from "./components/PlacementInfo";
import PlacementStats from "./components/PlacementStats";
import PartTimeStudentsInfo from "./components/PartTimeStudentsInfo";
import PartPlacementPartners from "./components/PartPlacementPartners";
import PartBannerServer from "./components/PartBannerServer";
import PlacedStudentsInfo from "./components/PlacedStudentsInfo";
import InternshipStudentsInfo from "./components/InternshipStudentsInfo";

const PlacementsPage = () => {
    return (
        <div>
            <PartBannerServer />
            <PlacementInfo />
            <PlacementStats />
            <PlacedStudentsInfo />
            <PartTimeStudentsInfo />
            <InternshipStudentsInfo />
            <PartPlacementPartners />
        </div>
    );
};

export default PlacementsPage;
