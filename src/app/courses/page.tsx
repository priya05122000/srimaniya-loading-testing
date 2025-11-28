// src/app/courses/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Online Hotel Management Courses | Sri Maniya Institute",
  description:
    "Apply online for hotel management courses at Sri Maniya Institute. Explore diploma, BSc catering science, MBA/PG programs, course duration, fees, and admission details",
  keywords: [
    // Main keywords
    "hotel management degree course fees",
    "hotel management course fees after 12th",
    "hotel management diploma course fees",
    "bsc hotel management fees",
    "hotel management course apply online",
    // Secondary keywords
    "hotel management degree course duration",
    "hotel management course 1 year fees",
    "hotel management course 2 years",
    "hospitality management fees",
    "bsc in catering science and hotel management",
    "sri maniya institute diploma courses",
    "Sri Maniya Institute MBA / PG courses",
    "Sri Maniya Institute admission"
  ],
};

import CoursesPage from "./CoursesPage";

export default function Page() {
  return <CoursesPage />;
}
