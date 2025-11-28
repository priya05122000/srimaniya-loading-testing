import React from 'react'
import type { Metadata } from "next";
import EventsBlogPage from './EventsBlogPage';

export const metadata: Metadata = {
  title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
  description:
    "Get the best hospitality career insights, hotel management tips, and guidance from Sri Maniya Institute Blog. Learn trends, training advice, and industry skills to build your future.",
  keywords: [
    "Hospitality Career Insights",
    "diploma in hotel management",
    "diploma in catering and hotel management",
    "hotel management career options",
    "hotel management and catering technology course details",
    "hotel management career opportunities",
    "diploma in hotel management duration",
    "best hotel management colleges",
    "hotel management institute",
    "best hospitality management colleges"
  ],
};

const page = () => {
  return (
    <div>
      <EventsBlogPage />
    </div>
  )
}

export default page