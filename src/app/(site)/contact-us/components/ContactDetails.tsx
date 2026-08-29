import React from "react";
import Link from "next/link";

/**
 * Server-rendered supporting content for the Contact page. The visible page is
 * map + form UI with very little text, so this section carries the useful detail
 * a crawler / screen reader needs: where the campus is, how to reach admissions,
 * what the team can help with, and a short FAQ.
 *
 * Rendered `sr-only` (visually hidden) — it ships in the initial HTML and is
 * read by assistive tech, but does not change the visible layout.
 */

const HELP_TOPICS: { title: string; body: string }[] = [
  {
    title: "Admissions & eligibility",
    body: "Course options after 10th or 12th, eligibility for diploma, pathway, degree and postgraduate programmes, application steps, and important dates for the current intake.",
  },
  {
    title: "Fees & scholarships",
    body: "Fee structure for each hotel management course, payment schedule, education-loan assistance, and merit, sports and management-quota scholarships you may qualify for.",
  },
  {
    title: "Courses & curriculum",
    body: "Subjects covered in food production, food & beverage service, front office and housekeeping, along with the kitchen, restaurant and hotel training built into every programme.",
  },
  {
    title: "Internships & placement",
    body: "First-year internships, industry training partners, and the 100% placement support our team provides across hotels, resorts, cruise lines and airlines in India and abroad.",
  },
  {
    title: "Campus visit & hostel",
    body: "Booking a campus tour, meeting the faculty, hostel and accommodation options for outstation students, and transport to the Kanyakumari campus.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where is Sri Maniya Institute of Hotel Management located?",
    a: "The institute is at No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu - 629702. It is close to Kanyakumari town and the railway and bus stands, with easy road access from Nagercoil, Trivandrum and other parts of South Tamil Nadu.",
  },
  {
    q: "How do I reach the campus?",
    a: "From Kanyakumari bus stand or railway station the campus is a short drive via Government Hospital Road. From Nagercoil it is about 20 km along the Kanyakumari road, and Trivandrum International Airport is roughly 85 km away. Use the map on this page for turn-by-turn directions.",
  },
  {
    q: "What are the office hours for admission enquiries?",
    a: "The admissions office is open Monday to Saturday, 9:30 AM to 5:30 PM. You can call or email any time and the team will respond on the next working day.",
  },
  {
    q: "Can I visit the campus before applying?",
    a: "Yes. Prospective students and parents are welcome to visit, see the training kitchens, restaurant and classrooms, and meet the faculty. Call ahead on +91 89038 64444 so the team can plan your visit.",
  },
  {
    q: "How soon will I get a response after I submit an enquiry?",
    a: "An admissions counsellor usually calls or emails within one working day with course details, eligibility, fees and the next steps for enrolment.",
  },
];

const ContactDetails = () => {
  return (
    <section className="sr-only">
      <h2>Get in touch with Sri Maniya Institute</h2>
      <p>
        Sri Maniya Institute of Hotel Management is a hospitality and catering
        training college in Kanyakumari, Tamil Nadu. Whether you are a student
        planning a career in hotel management, a parent comparing courses, or a
        hospitality employer looking to hire our graduates, our team is happy to
        help. Reach us by phone, email or the enquiry form on this page and we
        will get back to you with the details you need.
      </p>
      <p>
        Call <a href="tel:+918903864444">+91 89038 64444</a> or email{" "}
        <a href="mailto:admission@srimaniyainstitute.in">
          admission@srimaniyainstitute.in
        </a>
        . The campus is at No: 6/66-D1, Government Hospital Road, Kanyakumari,
        Tamil Nadu - 629702. The admissions office is open Monday to Saturday,
        9:30 AM to 5:30 PM.
      </p>

      <h3>How to reach the campus</h3>
      <p>
        The institute is on Government Hospital Road in Kanyakumari, within easy
        reach of the town centre, railway station and bus stand. From Nagercoil,
        take the Kanyakumari road (about 20 km, 30&ndash;40 minutes). From
        Trivandrum, the campus is roughly 85 km via NH66, and Trivandrum
        International Airport is the nearest airport. Frequent government and
        private buses connect Kanyakumari with Nagercoil, Tirunelveli, Madurai
        and Trivandrum, and the station is served by trains from Chennai,
        Bangalore, Mumbai and Delhi.
      </p>
      <p>
        Use the interactive map below for driving directions, or call the office
        if you need help planning your route or arranging a pickup.
      </p>

      <h3>What our team can help you with</h3>
      <dl>
        {HELP_TOPICS.map((topic) => (
          <React.Fragment key={topic.title}>
            <dt>{topic.title}</dt>
            <dd>{topic.body}</dd>
          </React.Fragment>
        ))}
      </dl>
      <p>
        Ready to apply? You can also start your{" "}
        <Link href="/registration-form">student admission form</Link> online or
        browse the full list of{" "}
        <Link href="/courses">hotel management courses</Link>.
      </p>

      <h3>Frequently asked questions</h3>
      <dl>
        {FAQS.map((faq) => (
          <React.Fragment key={faq.q}>
            <dt>{faq.q}</dt>
            <dd>{faq.a}</dd>
          </React.Fragment>
        ))}
      </dl>
    </section>
  );
};

export default ContactDetails;
