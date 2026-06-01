import dynamic from "next/dynamic";
import Partners from "./components/PartnersClient";
const AboutStats = dynamic(() => import("./components/AboutStats"));
const Courses = dynamic(() => import("./components/Courses"));
// const AlumniStories = dynamic(() => import("./components/AlumniStories"));
const Awards = dynamic(() => import("./components/Awards"));
const CommitmentBanner = dynamic(() => import("./components/CommitmentBanner"));
const ShowReel = dynamic(() => import("./components/ShowReel"));
const ScrollToEnquire = dynamic(() => import("./components/ScrollToEnquire"));
const EnquireForm = dynamic(() => import("./components/EnquireForm"));
const EventsBlogs = dynamic(() => import("./components/EventsBlogsWrapper"));
// const HeroServer = dynamic(() => import("./components/hero/HeroServer"));
const PlacementMapServer = dynamic(() => import("./components/placementMap/PlacementMapServer"));
const AlumniStoriesServer = dynamic(() => import("./components/alumniStory/AlumniStoriesServer"));

import HeroServer from "./components/hero/HeroServer";


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
