import React from 'react'
import type { Metadata } from "next";
import PlacementsPage from './PlacementsPage';

export const metadata: Metadata = {
  title: "Sri Maniya Institute - 100% Hotel Management Placement Support",
  description:
    "Sri Maniya Institute offers 100% hotel management placement support with internships, top hospitality recruiters, full-time job opportunities, and career guidance for all students.",
  keywords: [
    // Main keywords
    "Sri Maniya Institute placement",
    "hotel management placement",
    "hotel management course placement",
    // Secondary keywords
    "placement after hotel management",
    "hotel management job opportunities",
    "hotel management career opportunities",
    "hotel management internship",
    "top recruiters for hotel management students",
    "full time placements in hospitality",
    "100 % placement assistance hotel management",
    "Sri Maniya Institute career support",
    "career guidance in hospitality",
    "placement partners in hospitality industry"
  ],
};

const page = () => {
  return (
    <div>
      <PlacementsPage />
    </div>
  )
}

export default page
