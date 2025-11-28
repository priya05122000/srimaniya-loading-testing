import React from 'react'
import AboutUsPage from './AboutUsPage'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us | Top hotel management college in Tamil Nadu",
  description:
    "Learn about hospitality careers and the wide range of career paths in the hospitality industry. Explore our courses, objectives, and salary insights at Srimaniya Institute, a top hotel management college in Tamil Nadu",
  keywords: [
    // Main keywords
    "institute of hotel management",
    "Top Hotel Management College",
    "hotel management institute in tamilnadu",
    "hospitality and management courses in tamilnadu",
    "best hotel management institute in Tamilnadu",
    // Secondary keywords
    "hotel management education",
    "hotel management course with placement",
    "hospitality and hotel management courses",
    "job opportunities after hotel management",
    "global hospitality careers",
    "practical training in hospitality",
    "hospitality management college tamil nadu",
    "Sri Maniya Institute About Us"
  ],
};

const page = () => {
  return (
    <div>
      <AboutUsPage />
    </div>
  )
}

export default page
