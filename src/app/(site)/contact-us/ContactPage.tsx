import React from "react";
import Contact from "./components/Contact";
import Appointment from "./components/Appointment";
import { SiteInfo } from "@/types";

const ContactPage = ({ siteInfo }: { siteInfo: SiteInfo | null }) => {
  return (
    <div>
      <Contact siteInfo={siteInfo} />
      <Appointment />
    </div>
  );
};

export default ContactPage;
