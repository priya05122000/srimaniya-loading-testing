import { getAllAlumniStories } from "@/services/alumniStoryService";
import AlumniStoriesClient from "./AlumniStoriesClient";
import { AlumniStory } from "@/types";

export default async function AlumniStories() {
  const res = await getAllAlumniStories();
  const alumni = Array.isArray(res?.data)
    ? res.data.filter((a: AlumniStory) => a.status)
    : [];

  if (!alumni.length) return null;

  return <AlumniStoriesClient alumniData={alumni} />;
}
