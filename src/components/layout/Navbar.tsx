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
import { IoClose } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { InputField } from "@/components/ui/FormFields";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import Span from "../common/Span";
import Paragraph from "../common/Paragraph";

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

// -------------------- Main Navbar --------------------
const Navbar: FC<NavbarProps> = ({ sticky = true }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [showBrochureModal, setShowBrochureModal] = useState<boolean>(false); // NEW
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState<FormData>(initialForm);

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };


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
            className={`navbar h-20 z-50 bg-(--blue) w-full shadow-sm border-b border-(--grey-custom)
        ${sticky ? "fixed top-0 " : ""}
        transition-opacity duration-500
        navbar--visible
      `}
        >
            <div className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full">
                {/* Navigation Menu */}
                <div className="flex items-center order-1 pl-6 sm:pl-8 sm:border-r border-(--grey-custom) ">
                    {/* Hamburger */}
                    <div
                        className="xl:hidden mr-2"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        role="button"
                        tabIndex={0}
                        aria-label="Open menu"
                    >
                        {/* Hamburger icon can be added here if needed */}
                        <span className="w-8 h-8 bg-(--grey) rounded" />
                    </div>
                    {/* Nav Links */}
                    <div
                        className={`nav-elements
    fixed top-20 left-0
    h-[calc(100vh-80px)] w-[280px]
    bg-(--blue) transition-transform duration-300 z-40
    ${menuOpen
                                ? "translate-x-0 px-6 py-8 shadow-lg"
                                : "-translate-x-full px-6 py-8"
                            }
    xl:static xl:h-auto xl:w-auto xl:bg-transparent xl:translate-x-0 xl:px-0 xl:py-0 xl:shadow-none
    xl:flex xl:items-center`}
                    >
                        <ul className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0 mt-8 xl:mt-0">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name} className="relative group">
                                    <Link
                                        href={link.href ?? "#"}
                                        className={`text-base  text-(--white-custom) transition-colors duration-200 relative  py-2
                                              ${isActive(link.href ?? "#")
                                                ? "border-b border-(--white-custom)"
                                                : "hover:border-b hover:border-(--white-custom)"
                                            }`}

                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Brochure Button */}
                        <div className="mt-6 xl:mt-0 xl:ml-4">
                            <button
                                className="relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1"
                                onClick={() => setShowBrochureModal(true)}
                            >
                                <Paragraph size="base" className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">
                                    Brochure <GoDownload />
                                </Paragraph>
                                <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Logo */}
                <Link
                    href="/"
                    className="logo flex items-center justify-center order-2 pr-6 sm:pr-0"
                >
                    <Image
                        src="/logos/navbarlogo.png"
                        alt="Company Logo"
                        width={500}
                        height={500}
                        className="h-16 sm:h-12 w-auto object-contain"
                        priority
                    />
                </Link>
            </div>
            {/* Overlay for mobile menu */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-(--black)/30 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
            {/* Brochure Modal */}
            <AnimatePresence>
                {showBrochureModal && (
                    <motion.div
                        className="fixed inset-0 z-100 flex items-center justify-center bg-(--grey-custom)/40 p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-(--blue)  shadow-lg p-6 max-w-lg w-full relative"
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
                                        className="relative flex justify-center items-center gap-1 rounded bg-(--yellow) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-4 py-1"
                                        disabled={submitting}
                                    >
                                        <Paragraph
                                            size="base" className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--yellow)">
                                            Download Brochure <GoDownload />
                                        </Paragraph>
                                        <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
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
