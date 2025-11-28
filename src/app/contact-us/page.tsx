import React from 'react'
import type { Metadata } from "next";
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: "Contact Srimaniya Institute of Hotel Management in Tamil Nadu ",
  description:
    "Sri Maniya Institute Tamil Nadu is one of the best hotel management institutes near you. Explore courses, contact support, submit the enquiry form, and start your career in hospitality",
  keywords: [
    "sri maniya institute contact",
    "hotel management institute contact Tamil Nadu",
    "institute of hotel management near me",
    "hotel management colleges in near me",
    "Best hotel management courses near me",
    "Sri Maniya Institute Tamil Nadu",
    "Sri Maniya Institute contact number",
    "Sri Maniya Institute Nagercoil",
    "Sri Maniya Institute near me",
    "hotel management institute location details",
    "hospitality institute contact Tamil Nadu",
    "Sri Maniya Institute enquiry form"
  ],
};

const page = () => {
  return (
    <div>
      <ContactPage />
    </div>
  )
}

export default page