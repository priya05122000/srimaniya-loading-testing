import React from 'react'
import Hero from './components/Hero'
import Partners from './components/Partners'
import AboutStats from './components/AboutStats'
import PlacementMap from './components/PlacementMap'
import Courses from './components/Courses'
import AlumniStories from './components/AlumniStories'
import Awards from './components/Awards'
import CommitmentBanner from './components/CommitmentBanner'
import ShowReel from './components/ShowReel'
import EnquireForm from './components/EnquireForm'
import EventsBlogs from './components/EventsBlogs'

const HomePage = () => {
    return (
        <div>
            <Hero />
            <Partners />
            <CommitmentBanner />
            <AboutStats />
            <div id="enquire-form">
                <EnquireForm />
            </div>
            {/* <PlacementMap /> */}
            <Courses />
            <AlumniStories />
            <EventsBlogs />
            <Awards />
            <div className="relative">
                <ShowReel />
            </div>
        </div>
    )
}

export default HomePage
