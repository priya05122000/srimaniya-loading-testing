import PlacementInfo from "./components/PlacementInfo";
import PlacementStats from "./components/PlacementStats";
import PartTimeStudentsInfo from "./components/PartTimeStudentsInfo";
import PartPlacementPartners from "./components/PartPlacementPartners";
import PartBannerServer from "./components/PartBannerServer";
import PlacedStudentsInfo from "./components/PlacedStudentsInfo";

interface PlacementsPageProps {
    alumniStories: any[];
    placements: any[];
    partners: any[];
}

const PlacementsPage = ({ alumniStories, placements, partners }: PlacementsPageProps) => {
    return (
        <div>
            <PartBannerServer />
            <PlacementInfo />
            <PlacementStats />
            <PlacedStudentsInfo initialData={alumniStories} />
            <PartTimeStudentsInfo initialData={placements} />
            <PartPlacementPartners partners={partners} />
        </div>
    );
};

export default PlacementsPage;
