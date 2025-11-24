import React from 'react'
import Hero from './components/Hero'
import Partners from './components/Partners'
import AboutStats from './components/AboutStats'
import PlacementMap from './components/PlacementMap'
import Courses from './components/Courses'
import AlumniStories from './components/AlumniStories'

const HomePage = () => {
    return (
        <div>
            <Hero />
            {/* <Partners /> */}
            {/* <AboutStats /> */}
            <PlacementMap />
            <Courses />
            <AlumniStories />
        </div>
    )
}

export default HomePage
