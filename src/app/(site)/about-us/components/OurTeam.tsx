"use client";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { getAllStaffProfiles } from "@/services/staffProfileService";
import Span from "@/components/common/Span";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

type StaffProfile = {
  name: string;
  designation: string;
  education: string;
  description: string;
  experience_years: number;
  profile_photo_url: string;
  overlay?: boolean;
  alt?: string;
  status: boolean;
};

// Reusable card for team member (desktop and mobile)
type TeamMemberCardProps = StaffProfile & {
  priority?: boolean;
  reverseSm?: boolean;
  reverseXl?: boolean;
  overlay?: boolean;
  isOpen?: boolean;
  onOpen?: () => void;
  mobile?: boolean;
  onLoadingComplete?: () => void;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  designation,
  education,
  description,
  profile_photo_url,
  experience_years,
  priority = false,
  reverseSm = false,
  reverseXl = false,
  overlay = false,
  isOpen = false,
  onOpen,
  mobile = false,
  alt,
  onLoadingComplete,
}) => {
  // Overlay card (for mobile/desktop popover)
  if (overlay && profile_photo_url) {
    return (
      <div
        className={`relative group cursor-pointer`}
        onClick={!mobile ? onOpen : undefined}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${profile_photo_url}`}
          alt={alt || "Team at Sri Maniya Institute of Hotel Management"}
          width={300}
          height={400}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-100 image-tag object-cover object-top"
          priority={priority}
          onLoadingComplete={onLoadingComplete}
        />
        {mobile && !isOpen && (
          <button
            className="absolute top-4 right-6 text-white z-20"
            onClick={onOpen}
          >
            View Details
          </button>
        )}
        <div
          data-section
          className={
            `absolute inset-0 bg-(--blue) bg-opacity-90 text-(--white-custom) flex flex-col justify-end border-b border-white/10 h-100 transition-opacity duration-300` +
            (mobile
              ? isOpen
                ? " opacity-100 pointer-events-auto z-10"
                : " opacity-0 pointer-events-none"
              : isOpen
                ? " opacity-100 pointer-events-auto z-10"
                : " opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto")
          }
        >
          {mobile && isOpen && (
            <button
              className="absolute top-4 right-6 text-white z-20"
              onClick={onOpen}
            >
              Close Details
            </button>
          )}
          <div className="bg-linear-to-t from-[black]/50 to-[black]/0 p-6 space-y-6">
            <div>
              <Paragraph size="xl" className="mb-2 font-bold">
                {name}
              </Paragraph>
              <Paragraph size="lg">{designation}</Paragraph>
              <Paragraph size="lg">{education}</Paragraph>
              <Paragraph size="lg">{experience_years} years of experience</Paragraph>
            </div>
            <div
              className="text-(--white-custom) text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    );
  }
  // Standard card (desktop)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  bg-(--blue) text-white overflow-hidden " data-section>
      {/* Image */}
      <div
        className={`relative w-full h-100 ${reverseSm ? "sm:order-2" : "sm:order-1"} ${reverseXl ? "xl:order-2" : "xl:order-1"}`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${profile_photo_url}`}
          alt="Team at Sri Maniya Institute of Hotel Management"
          width={300}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover w-full h-full object-top image-tag"
          priority={priority}
          onLoadingComplete={onLoadingComplete}
        />
      </div>
      {/* Text Content */}
      <div
        className={`w-full h-full md:w-full bg-linear-to-t from-[black]/50 to-[black]/0 p-6 space-y-3 flex flex-col justify-end ${reverseSm ? "sm:order-1" : "sm:order-2"} ${reverseXl ? "xl:order-1" : "xl:order-2"}`}
      >
        <p className="mb-2 font-jakarta text-xl sm:text-2xl lg:text-3xl font-bold">
          {name}
        </p>
        <Paragraph size="lg" className="font-medium mb-1 text-(--grey)">
          {designation}
        </Paragraph>
        <Span className="mt-1">
          {education}
        </Span>
        <Paragraph size="lg" className="mt-1">
          {experience_years} years of experience
        </Paragraph>
        <div
          className="text-(--white-custom) text-sm text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

const OurTeam: React.FC = () => {
  const teamRef = useRef<HTMLDivElement | null>(null);
  const [staffProfiles, setStaffProfiles] = useState<StaffProfile[]>([]);
  const [openMobileIdx, setOpenMobileIdx] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // SplitText animation refs
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: teamRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: staffProfiles.length > 0,
  });

  useEffect(() => {
    const fetchStaffProfiles = async () => {
      try {
        const result = await getAllStaffProfiles();
        const profiles = result?.data || [];

        const activeProfiles = profiles.filter((p: StaffProfile) => p.status);
        setStaffProfiles(activeProfiles);
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error(
            "Error fetching staff profiles:",
            (error as { message?: string }).message
          );
        } else {
          console.error("Error fetching staff profiles:", error);
        }
      }
    };
    fetchStaffProfiles();
  }, []);

  return (
    <div ref={teamRef}>
      <div className="py-10 sm:py-20">
        <Section >
          <div className="mb-10">
            <Paragraph
              ref={paragraphRef}
              size="lg"
              className="text-(--blue) font-bold our-team-title"
            >
              Our team
            </Paragraph>
            <h3
              ref={headingRef}
              className="text-(--blue) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold  uppercase meet-team-title leading-tight"
            >
              Meet the team
            </h3>
          </div>
        </Section>
        <div>
          {/* Mobile view */}
          <div className="grid grid-cols-1 md:hidden">
            {staffProfiles.slice(0, 2).map((member, idx) => (
              <TeamMemberCard key={idx} {...member} priority={idx === 0} onLoadingComplete={handleImageLoad} />
            ))}
            {staffProfiles.slice(2).map((member, idx) => (
              <TeamMemberCard
                key={idx}
                {...member}
                overlay={true}
                mobile={true}
                isOpen={openMobileIdx === idx}
                onOpen={() => setOpenMobileIdx(openMobileIdx === idx ? null : idx)}
                onLoadingComplete={handleImageLoad}
              />
            ))}
          </div>
          {/* Desktop view */}
          <div className="hidden md:grid xl:grid-cols-2">
            {staffProfiles.map((member, idx) => {
              const reverseSm = idx % 2 === 1;
              const reverseXl = Math.floor(idx / 2) % 2 === 1;
              return (
                <TeamMemberCard
                  key={idx}
                  {...member}
                  priority={idx < 2}
                  reverseSm={reverseSm}
                  reverseXl={reverseXl}
                  onLoadingComplete={handleImageLoad}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
};

export default OurTeam;
