"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckboxField,
  InputField,
  TextAreaField,
} from "@/components/ui/FormFields";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

// --- Types ---
type FormData = { name: string; email: string; mobile: string; message: string; agree: boolean };
type AddressInfoProps = { title: string; address: string; className?: string };
type CompanyInfoProps = { logoSrc: string; title: string; address: string; className?: string; logoClassName?: string };
type AppointmentFormFieldsProps = {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

// --- Constants ---
const COMPANY_LIST: CompanyInfoProps[] = [
  { logoSrc: "/contact-us/seashore.png", title: "Seashore & co", address: "2/12, East Car Street, Kanyakumari, Tamilnadu, India - 629702" },
  { logoSrc: "/contact-us/gtholidays.png", title: "GT Holidays Pvt LTD", address: "No.1, Gemini Parsn, Kodambakkam High Road, Nungambakkam, Chennai – 600006 Tamil Nadu, India." },
  { logoSrc: "/contact-us/follicle.webp", title: "Follicle", address: "NO 2/75, Customs Colony, OPP TO JAIN COLLEGE, Omr Service Road Ellaiamman Nagar, Thoraipakkam-600097 (OPP TO JAIN COLLEGE).", logoClassName: "w-32 h-20 flex items-end justify-center flex-shrink-0" },
];
const HOTELS_LIST = "Hotel Sangam | Chennai Inn | Rameshwaram Grand | Temple Citi | AR Residency | Comorin Grand | Hotel Seaview | Hotel Seaface | Ocean Heritage | Triveni Tourist Home | Gopinivas Grand";

// --- Reusable UI Components ---
const AddressInfo: React.FC<AddressInfoProps> = React.memo(({ title, address, className }) => (
  <div className={className}>
    <Paragraph size="lg" className="text-(--dark) font-semibold">{title}</Paragraph>
    <div className="text-(--dark) text-sm xl:text-base" dangerouslySetInnerHTML={{ __html: address }} />
  </div>
));
AddressInfo.displayName = "AddressInfo";

const CompanyInfo: React.FC<CompanyInfoProps> = React.memo(({ logoSrc, title, address, className = "flex flex-col sm:flex-row sm:items-end gap-6 xl:gap-8 px-6 lg:px-8", logoClassName = "w-32  h-auto flex items-end justify-center flex-shrink-0 " }) => (
  <div className={className}>
    <div className={logoClassName}>
      <Image src={logoSrc} alt="Partner Logo" className="object-contain w-auto h-auto max-h-full  mr-auto" loading="lazy" width={120} height={120} />
    </div>
    <AddressInfo title={title} address={address} />
  </div>
));
CompanyInfo.displayName = "CompanyInfo";

const AppointmentFormFields: React.FC<AppointmentFormFieldsProps> = React.memo(({ formData, handleChange }) => (
  <>
    <InputField type="text" label="Name" name="name" value={formData.name} onChange={handleChange} required />
    <InputField type="email" label="Email" name="email" value={formData.email} onChange={handleChange} />
    <InputField type="tel" label="Mobile number" name="mobile" value={formData.mobile} onChange={handleChange} required />
    <TextAreaField label="Message" name="message" rows={3} value={formData.message} onChange={handleChange} />
    <CheckboxField label="By submitting this form, I agree to Sri Maniya Institute’s Terms & Conditions and Privacy Policy." name="agree" checked={formData.agree} onChange={handleChange} />
  </>
));
AppointmentFormFields.displayName = "AppointmentFormFields";

const SubmitButton: React.FC<{ label?: string }> = React.memo(({ label = "Submit" }) => (
  <button type="submit" className="relative flex justify-center items-center rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]">
    <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">{label}</span>
    <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
  </button>
));
SubmitButton.displayName = "SubmitButton";

// --- Mobile Layout ---
const MobileLayout: React.FC<{
  formData: FormData;
  handleChange: AppointmentFormFieldsProps["handleChange"];
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleChange, handleSubmit }) => {
  // SplitText animation for mobile headings
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitTextHeadingAnimation({
    trigger: headingRef,
    first: headingRef,
    enabled: true,
    delay: 0.3,
  });

  return (
    <div className="block md:hidden">
      {/* Map */}
      <section className="section flex flex-col items-center w-full">
        <div className="w-full h-64 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.177113550052!2d77.54813299999999!3d8.083412500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed24dbcd81e9%3A0x521bf8103d1a1232!2sSri%20Maniya%20Institute%20of%20Hotel%20Management!5e0!3m2!1sen!2sin!4v1757673979727!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </section>
      {/* Form */}
      <section className="section bg-(--blue) flex justify-center items-center w-full py-8" data-section>
        <form onSubmit={handleSubmit} className="space-y-4 w-full px-6">
          <AppointmentFormFields formData={formData} handleChange={handleChange} />
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </section>
      {/* Image */}
      <section className="section flex flex-col items-start w-full sm:py-8">
        <div className="w-full">
          <div className="flex flex-col gap-4 h-full">
            <div className="w-full sm:h-40 bg-white flex items-center justify-center mb-4">
              <Image src="/contact-us/contact.jpg" alt="Kitchen" width={700} height={700} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Companies & Hotels */}
      <section className="section flex flex-col items-start w-full py-8">
        <Heading
          ref={headingRef}
          level={4}
          className="text-(--blue) mt-2 uppercase  px-6 pt-2 lg:px-8 py-10 leading-tight"
        >
          Our Group of Companies
        </Heading>
        <div className="space-y-6 lg:space-y-8 w-full">
          {COMPANY_LIST.map((company) => (<CompanyInfo key={company.title} {...company} />))}
        </div>
        <Paragraph size="lg" className="text-(--dark) font-semibold px-6 pt-6 lg:px-8 text-center">{HOTELS_LIST}</Paragraph>
      </section>
    </div>
  );
};

// --- Desktop Layout ---
const DesktopLayout: React.FC<{
  formData: FormData;
  handleChange: AppointmentFormFieldsProps["handleChange"];
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleChange, handleSubmit }) => (
  <div className="hidden md:block">
    {/* Map */}
    <section className="layer-section flex justify-center items-center h-[calc(100vh-80px)]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.177113550052!2d77.54813299999999!3d8.083412500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed24dbcd81e9%3A0x521bf8103d1a1232!2sSri%20Maniya%20Institute%20of%20Hotel%20Management!5e0!3m2!1sen!2sin!4v1757673979727!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
    </section>
    {/* Form */}
    <section className="layer-section bg-(--blue) flex justify-center items-center h-[calc(100vh-80px)] w-full sm:w-[60%] xl:w-1/2 ml-auto z-10" data-section>
      <form onSubmit={handleSubmit} className="space-y-3 xl:space-y-4 pt-10 px-6 lg:px-8">
        <AppointmentFormFields formData={formData} handleChange={handleChange} />
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </section>
    {/* Companies & Hotels */}
    <section className="layer-section flex justify-center items-start h-[calc(100vh-80px)] z-0">
      <div className="h-full w-full">
        <div className="flex flex-row gap-4 md:gap-0 h-full">
          <div className="w-full sm:w-[40%] lg:w-1/2 hidden md:block h-full">
            <Image src="/contact-us/contact.jpg" alt="Kitchen" width={700} height={700} className="w-full h-full object-cover" />
          </div>
          <div className="w-full sm:w-[60%] lg:w-1/2 flex flex-col md:justify-end py-8">
            <Heading level={4} className="text-(--blue) mt-2 uppercase  px-6 pt-6 lg:px-8 font-bold sm:py-10 leading-tight hidden xl:block">Our Group of <br /> Companies</Heading>
            <Heading level={5} className="text-(--blue) mt-2 uppercase  px-6 pt-6 lg:px-8 font-bold sm:py-10 hidden lg:block  leading-tight xl:hidden">Our Group of Companies</Heading>
            <Heading level={5} className="text-(--blue) leading-tight mt-2 uppercase  px-6 pt-6 lg:px-8 font-bold sm:py-4 hidden sm:block lg:hidden">Our Group of Companies</Heading>
            <div className="relative overflow-hidden">
              <div className="space-y-6 lg:space-y-8">
                {COMPANY_LIST.map((company) => (<CompanyInfo key={company.title} {...company} />))}
              </div>
              <Paragraph size="base" className="text-(--dark) font-semibold px-6 pt-6 lg:px-8 text-center hidden xl:block">{HOTELS_LIST}</Paragraph>
              <Span className="text-(--dark) font-semibold px-6 pt-6 lg:px-8 text-center block xl:hidden">{HOTELS_LIST}</Span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// --- Main Appointment Component ---
const Appointment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", mobile: "", message: "", agree: false });
  const { setLoading: setGlobalLoading } = useGlobalLoader();
  const [mounted, setMounted] = useState(false);

  // Mount state for SSR/CSR safety
  useEffect(() => { setMounted(true); }, []);

  // GSAP/ScrollTrigger for desktop layout
  useLayoutEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const layers = gsap.utils.toArray<HTMLElement>(".layer-section");
        if (!layers.length) return;
        layers.forEach((layer, i) => {
          const pauseLayer = layer.dataset.pauseLayer === "true";
          const isLast = i === layers.length - 1;
          if (pauseLayer) {
            gsap.set(layer, { marginBottom: "300vh" });
            const slides = gsap.utils.toArray<HTMLElement>(".horizontal-slide", layer);
            gsap.to(slides, { xPercent: -100 * (slides.length - 1), ease: "power1.inOut", scrollTrigger: { trigger: layer, start: "top top+=80", end: "+=300%", scrub: true } });
            ScrollTrigger.create({ trigger: layer, start: "top top+=80", end: "+=400%", scrub: true, pin: true, pinSpacing: isLast, id: String(i + 1) });
          } else {
            ScrollTrigger.create({ trigger: layer, start: "top top+=80", end: "+=100%", pin: true, pinSpacing: isLast, id: String(i + 1) });
          }
        });
        ScrollTrigger.refresh();
      }, containerRef);
      return () => ctx.revert();
    }, 400);
    return () => clearTimeout(timeout);
  }, [mounted]);

  if (!mounted) return null;

  // --- Form Handlers ---
  const handleChange: AppointmentFormFieldsProps["handleChange"] = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) { alert("You must agree to the terms before submitting."); return; }
    setGlobalLoading(true);
    try {
      const payload = { name: formData.name, email: formData.email || null, phone_number: formData.mobile, message: formData.message || null };
      await createAppoinmentRequest(payload);
      toast.success("Enquiry submitted successfully!");
      setFormData({ name: "", email: "", mobile: "", message: "", agree: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit enquiry.";
      toast.error(errorMessage);
    } finally {
      setGlobalLoading(false);
    }
  };

  // --- Render ---
  return (
    <div ref={containerRef} className="w-full">
      <MobileLayout formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <DesktopLayout formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Appointment;
