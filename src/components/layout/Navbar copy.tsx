"use client";
import React, {
  useState,
  useEffect,
  FC,
  MouseEvent,
  KeyboardEvent,
  FormEvent,
  ChangeEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { InputField } from "@/components/FormFields";
import districts from "../lib/districts.json";
import { IoClose } from "react-icons/io5";
import { GoDownload } from "react-icons/go";

import { createAppoinmentRequest } from "@/services/appoinmentRequestService";

// -------------------- Types --------------------
interface NavLink {
  name: string;
  href?: string;
  sublinks?: { name: string; href: string }[];
}

interface NavbarProps {
  sticky?: boolean;
  className?: string;
}

type FormData = {
  StudentName: string;
  ParentName: string;
  StudentPhone: string;
  ParentPhone: string;
  StudentEmail: string;
  Address: string;
  City: string;
  State: string;
  District: string;
  PinCode: string;
};

const initialForm: FormData = {
  StudentName: "",
  ParentName: "",
  StudentPhone: "",
  ParentPhone: "",
  StudentEmail: "",
  Address: "",
  City: "",
  State: "",
  District: "",
  PinCode: "",
};

// -------------------- Data --------------------
const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Placements", href: "/placements" },
  { name: "Scholarship", href: "/scholarship" },
  { name: "Events & Blog", href: "/events-blog" },
  { name: "Career", href: "/career" },
  { name: "Contact Us", href: "/contact-us" },
];

// -------------------- Components --------------------

// Logo
const Logo: FC<{ id?: string }> = ({ id }) => (
  <Image
    id={id}
    src="/logos/navbarlogo.png"
    alt="Company Logo"
    width={500}
    height={500}
    className="h-16 sm:h-12 w-auto object-contain"
    priority
  />
);

// Hamburger Menu
const Hamburger: FC<{ open: boolean }> = ({ open }) => (
  <span
    className="relative flex items-center justify-center w-8 h-8 transition-all duration-300"
    aria-hidden="true"
  >
    <span
      className={`absolute transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"
        }`}
    >
      <Image
        src="/logos/sort.svg"
        alt="Open menu"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />
    </span>
    <span
      className={`absolute transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
        }`}
    >
      <Image
        src="/logos/close.png"
        alt="Close menu"
        width={32}
        height={32}
        className="w-6 h-6"
        priority
      />
    </span>
  </span>
);

// -------------------- Main Navbar --------------------
const Navbar: FC<NavbarProps> = ({ sticky = true }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const [openSubnav, setOpenSubnav] = useState<string | null>(null);
  const [showBrochureModal, setShowBrochureModal] = useState<boolean>(false); // NEW
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  // -------------------- Helpers --------------------
  const isActive = (
    href: string,
    sublinks?: { name: string; href: string }[]
  ) => {
    if (pathname === href || pathname.startsWith(href + "/")) return true;
    if (sublinks && sublinks.some((sublink) => pathname === sublink.href))
      return true;
    return false;
  };

  const handleMenuToggle = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => setMenuOpen(false);

  // -------------------- Effects --------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 640;
    const footer = document.getElementById("footer");
    let observer: IntersectionObserver | null = null;

    const handleHomeScroll = () => {
      const revealSection = document.querySelector(".reveal-section");
      // if (!revealSection) return;
      if (!revealSection) {
        setHideNavbar(false); // Always show if not found
        return;
      }
      const rect = revealSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const ratio = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / rect.height)
      );
      let threshold = 0.9;
      if (window.innerWidth >= 1024 && window.innerWidth < 1280)
        threshold = 0.6;
      setHideNavbar(ratio >= threshold);
    };

    const handleFooterScroll = () => {
      // if (!footer) return;
      if (!footer) {
        setHideNavbar(false); // Always show if not found
        return;
      }
      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleRatio = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / rect.height)
      );
      setHideNavbar(visibleRatio >= 0.8);
    };

    if (isMobile) {
      if (footer) {
        observer = new IntersectionObserver(
          ([entry]) => setHideNavbar(entry.intersectionRatio >= 0.8),
          { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
        );
        observer.observe(footer);
      }
    } else {
      if (pathname === "/") {
        window.addEventListener("scroll", handleHomeScroll);
        handleHomeScroll();
      } else {
        window.addEventListener("scroll", handleFooterScroll);
        handleFooterScroll();
      }
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleHomeScroll);
      window.removeEventListener("scroll", handleFooterScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (form.State && (districts as Record<string, string[]>)[form.State]) {
      // Removed: setDistrictOptions((districts as Record<string, string[]>)[form.State]);
    } else {
      // Removed: setDistrictOptions([]);
    }
  }, [form.State]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "State") {
      setForm((prev) => ({ ...prev, District: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { StudentName, StudentPhone, StudentEmail, City, State, District } =
      form;
    const brochureName = `(brochure) ${StudentName}`;
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName: brochureName,
            ParentName: "null",
            StudentPhone,
            ParentPhone: "null",
            StudentEmail: StudentEmail || "null",
            Address: "null",
            City: City || "null",
            State: State || "null",
            District: District || "null",
            PinCode: "null",
          }),
        }
      );

      const payload = {
        name: brochureName,
        phone_number: StudentPhone,
      };

      const response = await createAppoinmentRequest(payload);
      if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
        toast.error("Failed to submit the form. Please try again.");
        return;
      }

      toast.success("Form submitted successfully!");
      setForm(initialForm);
      // Trigger brochure download
      const brochureUrl = "/pdf/brochure.pdf"; // Update path if needed
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = "brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <nav
      className={`navbar h-[80px] z-[50] bg-blue-custom w-full shadow-sm border-b border-grey-custom
        ${sticky ? "fixed top-0 " : ""}
        transition-opacity duration-500
        ${hideNavbar ? "navbar--hidden" : "navbar--visible"}
      `}
    >
      <div className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full">
        {/* Navigation Menu */}
        <div className="flex items-center order-1 pl-6 sm:pl-8 sm:border-r border-grey-custom ">
          {/* Hamburger */}
          <div
            className="xl:hidden mr-2"
            onClick={handleMenuToggle}
            role="button"
            tabIndex={0}
            aria-label="Open menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleMenuToggle(e);
            }}
          >
            <Hamburger open={menuOpen} />
          </div>

          {/* Nav Links */}
          <div
            className={`nav-elements
    fixed top-[80px] left-0
    h-[calc(100vh-80px)] w-[280px]
    bg-blue-custom transition-transform duration-300 z-40
    ${menuOpen
                ? "translate-x-0 px-6 py-8 shadow-lg"
                : "-translate-x-full px-6 py-8"
              }
    xl:static xl:h-auto xl:w-auto xl:bg-transparent xl:translate-x-0 xl:px-0 xl:py-0 xl:shadow-none
    xl:flex xl:items-center`}
          >
            <ul className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0 mt-8 xl:mt-0">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (link.sublinks && window.innerWidth >= 1280)
                      setOpenSubnav(link.name);
                  }}
                  onMouseLeave={() => {
                    if (link.sublinks && window.innerWidth >= 1280)
                      setOpenSubnav(null);
                  }}
                >
                  {/* Main Link */}
                  <Link
                    href={link.href ?? "#"}
                    className={`text-base font-normal text-white-custom transition-colors duration-200 relative  py-2
                      ${isActive(link.href ?? "#", link.sublinks)
                        ? "border-b-1 border-white-custom"
                        : "hover:border-b hover:border-white-custom"
                      }`}
                    onClick={(e) => {
                      if (link.sublinks) {
                        if (window.innerWidth < 1280) {
                          e.preventDefault();
                          setOpenSubnav(
                            openSubnav === link.name ? null : link.name
                          );
                          return;
                        }
                      }
                      if (
                        typeof window !== "undefined" &&
                        window.sessionStorage
                      ) {
                        e.stopPropagation();
                        e.nativeEvent.preventDefault();
                        window.sessionStorage.setItem(
                          "scrollFooterThenTop",
                          "1"
                        );
                        router.push(link.href ?? "#");
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {link.name}
                  </Link>

                  {/* Sublinks */}
                  {link.sublinks && (
                    <>
                      {/* Desktop Dropdown */}
                      <ul
                        className={`absolute left-0 top-full mt-2 bg-blue-custom rounded shadow-lg min-w-[180px] z-50
                          ${openSubnav === link.name &&
                            window.innerWidth >= 1280
                            ? "block"
                            : "hidden"
                          }
                        `}
                      >
                        {link.sublinks.map((sublink) => (
                          <li key={sublink.name} onClick={handleLinkClick}>
                            <Link
                              href={sublink.href}
                              className="block mx-4 py-2 my-2 text-white-custom transition-colors duration-200"
                              onClick={(e) => {
                                if (
                                  typeof window !== "undefined" &&
                                  window.sessionStorage
                                ) {
                                  e.stopPropagation();
                                  e.nativeEvent.preventDefault();
                                  window.sessionStorage.setItem(
                                    "scrollFooterThenTop",
                                    "1"
                                  );
                                  router.push(sublink.href);
                                  setMenuOpen(false);
                                  setOpenSubnav(null);
                                }
                              }}
                            >
                              <span
                                className={`py-2 hover:border-b hover:border-white-custom ${pathname === sublink.href
                                  ? "border-b border-white-custom"
                                  : "hover:border-b hover:border-white-custom"
                                  }`}
                              >
                                {sublink.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Mobile Inline Subnav */}
                      <AnimatePresence initial={false}>
                        {openSubnav === link.name &&
                          window.innerWidth < 1280 && (
                            <motion.ul
                              className="pl-6 mt-2 overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                              {link.sublinks.map((sublink) => (
                                <li
                                  key={sublink.name}
                                  onClick={handleLinkClick}
                                >
                                  <Link
                                    href={sublink.href}
                                    className="block text-white-custom w-auto transition-colors duration-200 py-2"
                                    onClick={(e) => {
                                      if (
                                        typeof window !== "undefined" &&
                                        window.sessionStorage
                                      ) {
                                        e.stopPropagation();
                                        e.nativeEvent.preventDefault();
                                        window.sessionStorage.setItem(
                                          "scrollFooterThenTop",
                                          "1"
                                        );
                                        router.push(sublink.href);
                                        setMenuOpen(false);
                                        setOpenSubnav(null);
                                      }
                                    }}
                                  >
                                    <span
                                      className={`py-2 ${pathname === sublink.href
                                        ? "border-b border-white-custom"
                                        : "hover:border-b hover:border-white-custom"
                                        }`}
                                    >
                                      {sublink.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                      </AnimatePresence>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* Brochure Button */}
            <div className="mt-6 xl:mt-0 xl:ml-4">
              <button
                className="relative flex justify-center items-center gap-1 rounded-full bg-blue-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-3 py-1"
                onClick={() => setShowBrochureModal(true)}
              >
                <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                  Brochure <GoDownload />
                </span>
                <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
            </div>
          </div>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="logo flex items-center justify-center order-2 pr-6 sm:pr-0"
        >
          <Logo id="navbar-logo" />
        </Link>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={handleLinkClick}
        ></div>
      )}

      {/* Brochure Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-overlay-strong p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-blue-custom  shadow-lg p-6 max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 cursor-pointer text-2xl"
                onClick={() => setShowBrochureModal(false)}
                aria-label="Close"
              >
                <IoClose />
              </button>
              <div className="mb-8 flex justify-center">
                <Image
                  src="/logos/navbarlogo.png"
                  alt="Logo"
                  width={376}
                  height={94}
                  className="w-48 md:w-72"
                  priority
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-2 mt-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                  <InputField
                    label="Name *"
                    name="StudentName"
                    required
                    value={form.StudentName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Phone Number *"
                    name="StudentPhone"
                    type="tel"
                    required
                    value={form.StudentPhone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>
                {/* Buttons */}
                <div className="flex flex-row justify-end my-4 gap-2">
                  <button
                    type="submit"
                    className="relative flex justify-center items-center gap-1 rounded bg-yellow-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-4 py-1"
                    disabled={submitting}
                  >
                    <span className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-[#0B2351] text-base transition-all duration-300 group-hover:text-[#FFCE54]">
                      Download Brochure <GoDownload />
                    </span>
                    <span className="absolute left-0 top-0 w-full h-0 bg-blue-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                  </button>
                </div>
                {/* Note */}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
