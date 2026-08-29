import React from "react";
import Contact from "./components/Contact";
import Appointment from "./components/Appointment";
import ContactDetails from "./components/ContactDetails";
import { SiteInfo } from "@/types";

const ContactPage = ({ siteInfo }: { siteInfo: SiteInfo | null }) => {
  return (
    <div>
      <Contact siteInfo={siteInfo} />
      <ContactDetails />
      <Appointment />
    </div>
  );
};

export default ContactPage;
