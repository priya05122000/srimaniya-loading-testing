"use client"
import React, { useEffect } from 'react'
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
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            window.sessionStorage.getItem('scrollToEnquire') === '1'
        ) {
            window.sessionStorage.removeItem('scrollToEnquire');
            setTimeout(() => {
                const enquireSection = document.getElementById('enquire-form');
                if (enquireSection) {
                    // Try GSAP scroll if available (for smoother experience)
                    const win = window as unknown as { ScrollSmoother?: { get?: () => unknown } };
                    const smootherRaw = win.ScrollSmoother?.get?.();
                    const isSmoother = (obj: unknown): obj is { scrollTo: (target: HTMLElement, smooth: boolean) => void } =>
                        typeof obj === 'object' && obj !== null && typeof (obj as { scrollTo?: unknown }).scrollTo === 'function';
                    if (isSmoother(smootherRaw)) {
                        smootherRaw.scrollTo(enquireSection, true);
                        setTimeout(() => {
                            window.scrollBy({ top: -80, left: 0, behavior: 'auto' });
                        }, 400); // Wait for GSAP scroll to finish
                    } else {
                        enquireSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                            window.scrollBy({ top: -80, left: 0, behavior: 'auto' });
                        }, 400); // Wait for smooth scroll to finish
                    }
                }
            }, 400); // Wait for layout/GSAP to be ready
        }
    }, []);

    return (
        <div>
            <Hero />
            <Partners />
            <CommitmentBanner />
            <AboutStats />
            <div id="enquire-form">
                <EnquireForm />
            </div>
            <PlacementMap />
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
