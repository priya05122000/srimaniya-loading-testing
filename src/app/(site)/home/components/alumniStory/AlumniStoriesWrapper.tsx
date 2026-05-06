"use client";

import dynamic from "next/dynamic";
import { AlumniStory } from "@/types";

const AlumniStoriesClient = dynamic(
    () => import("./AlumniStoriesClient"),
    { ssr: false }
);

export default function AlumniStoriesWrapper({
    alumniData,
}: {
    alumniData: AlumniStory[];
}) {
    return <AlumniStoriesClient alumniData={alumniData} />;
}