"use client";
import dynamic from "next/dynamic";

const EventsBlogs = dynamic(() => import("./EventsBlogs"), { ssr: false });

export default function EventsBlogsWrapper() {
  return <EventsBlogs />;
}
