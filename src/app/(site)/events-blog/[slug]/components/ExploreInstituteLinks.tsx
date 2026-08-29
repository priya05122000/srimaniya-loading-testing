import React from "react";
import Link from "next/link";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

interface ExploreLink {
  href: string;
  anchor: string;
  blurb: string;
}

const LINKS: ExploreLink[] = [
  {
    href: "/courses",
    anchor: "Hotel management courses at Sri Maniya Institute",
    blurb:
      "Explore our degree, diploma and craft programmes in hotel management, culinary arts and hospitality operations.",
  },
  {
    href: "/about-us",
    anchor: "About Sri Maniya Institute of Hotel Management",
    blurb:
      "Learn about our campus, faculty and legacy of hospitality training in Kanyakumari, Tamil Nadu.",
  },
  {
    href: "/registration-form",
    anchor: "Apply for admission to Sri Maniya Institute",
    blurb:
      "Start your hospitality career — register online for the next intake and our admissions team will guide you.",
  },
  {
    href: "/placements",
    anchor: "Hotel management placements and recruiters",
    blurb:
      "See the hotels, resorts and hospitality brands that recruit our students and our placement track record.",
  },
  {
    href: "/scholarship",
    anchor: "Scholarships for hotel management students",
    blurb:
      "Check the merit and need-based scholarships available to support your studies with us.",
  },
  {
    href: "/events-blog",
    anchor: "More events and news from Sri Maniya Institute",
    blurb:
      "Browse all campus events, festival celebrations, workshops and student stories on our blog.",
  },
  {
    href: "/contact-us",
    anchor: "Contact Sri Maniya Institute of Hotel Management",
    blurb:
      "Get directions to the campus, phone numbers and email to reach our admissions and enquiry desk.",
  },
];

const ExploreInstituteLinks: React.FC = () => {
  return (
    <LeftSpaceGridSection className="sr-only">
      <nav
        aria-label="Explore Sri Maniya Institute of Hotel Management"
        className="pb-10 md:pb-16"
      >
        <div className="mb-8">
          <Heading level={6} className="text-(--blue) leading-tight mt-2">
            Explore Sri Maniya Institute
          </Heading>
          <Paragraph size="lg" className="text-(--dark) mt-2 max-w-3xl">
            Planning your hospitality career? These pages cover our courses,
            admissions, placements and life on campus.
          </Paragraph>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {LINKS.map((link) => (
            <li
              key={link.href}
              className="border-b border-(--grey-custom) pb-3"
            >
              <Link
                hrefLang="en"
                href={link.href}
                className="text-(--blue) font-medium underline underline-offset-4 decoration-1 leading-snug hover:opacity-80"
              >
                {link.anchor}
              </Link>
              <p className="text-(--dark) text-xs mt-1 line-clamp-2">
                {link.blurb}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </LeftSpaceGridSection>
  );
};

export default ExploreInstituteLinks;
