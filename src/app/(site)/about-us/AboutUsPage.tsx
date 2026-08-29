import React from 'react'
import AboutUs from './components/AboutUs'
import VisionMission from './components/VisionMission'
import OurStory from './components/OurStory'
import OurTeam from './components/OurTeam'
import Testimonials from './components/Testimonials'
import { SiteInfo } from '@/types'

interface AboutUsPageProps {
    siteInfo: SiteInfo | null;
    staffProfiles: any[];
    testimonials: any[];
}

const AboutUsPage = ({ siteInfo, staffProfiles, testimonials }: AboutUsPageProps) => {
    return (
        <div>
            <AboutUs />
            <VisionMission siteInfo={siteInfo} />
            <OurStory />
            <OurTeam staffProfiles={staffProfiles} />
            <Testimonials testimonials={testimonials} />
        </div>
    )
}

export default AboutUsPage
