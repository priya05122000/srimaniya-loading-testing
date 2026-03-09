import Hero from "./components/Hero";
import Partners from "./components/Partners";
import AboutStats from "./components/AboutStats";
import PlacementMap from "./components/PlacementMap";
import Courses from "./components/Courses";
import AlumniStories from "./components/AlumniStories";
import Awards from "./components/Awards";
import CommitmentBanner from "./components/CommitmentBanner";
import ShowReel from "./components/ShowReel";
import EnquireForm from "./components/EnquireForm";
import EventsBlogs from "./components/EventsBlogs";
import HeroServer from "./components/hero/HeroServer";
import ScrollToEnquire from "./components/ScrollToEnquire";
import PlacementMapServer from "./components/placementMap/PlacementMapServer";
import CourseServer from "./components/courses/CoursesServer";
import AlumniStoriesServer from "./components/alumniStory/AlumniStoriesServer";

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
