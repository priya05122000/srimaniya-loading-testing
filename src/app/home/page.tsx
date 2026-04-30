import dynamic from "next/dynamic";
// import Partners from "./components/Partners";
const Partners = dynamic(() => import("./components/Partners"));
const AboutStats = dynamic(() => import("./components/AboutStats"));
const Courses = dynamic(() => import("./components/Courses"));
// const AlumniStories = dynamic(() => import("./components/AlumniStories"));
const Awards = dynamic(() => import("./components/Awards"));
const CommitmentBanner = dynamic(() => import("./components/CommitmentBanner"));
const ShowReel = dynamic(() => import("./components/ShowReel"));
const ScrollToEnquire = dynamic(() => import("./components/ScrollToEnquire"));
const EnquireForm = dynamic(() => import("./components/EnquireForm"));
const EventsBlogs = dynamic(() => import("./components/EventsBlogs"));
// const HeroServer = dynamic(() => import("./components/hero/HeroServer"));
const PlacementMapServer = dynamic(() => import("./components/placementMap/PlacementMapServer"));
const AlumniStoriesServer = dynamic(() => import("./components/alumniStory/AlumniStoriesServer"));
// import AboutStats from "./components/AboutStats";
// import Courses from "./components/Courses";
// import Awards from "./components/Awards";
// import CommitmentBanner from "./components/CommitmentBanner";
// import ShowReel from "./components/ShowReel";
// import EnquireForm from "./components/EnquireForm";
// import EventsBlogs from "./components/EventsBlogs";
import HeroServer from "./components/hero/HeroServer";
// import ScrollToEnquire from "./components/ScrollToEnquire";
// import PlacementMapServer from "./components/placementMap/PlacementMapServer";
// import AlumniStoriesServer from "./components/alumniStory/AlumniStoriesServer";

const HomePage = () => {
  return (
    <div>
      {/* <Hero /> */}
      <HeroServer />
      <Partners />
      <CommitmentBanner />
      <AboutStats />
      <div id="enquire-form">
        <EnquireForm />
      </div>
      <PlacementMapServer />
      {/* <PlacementMap /> */}
      {/* <CourseServer /> */}
      <Courses />
      {/* <AlumniStories /> */}
      <AlumniStoriesServer />
      <EventsBlogs />
      <Awards />
      <div className="relative">
        <ShowReel />
      </div>
      <ScrollToEnquire />
    </div>
  );
};

export default HomePage;
