"use client";
import React, {
    useState,
    FormEvent,
    ChangeEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GoDownload } from "react-icons/go";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import Paragraph from "../common/Paragraph";
import BrochureModal from "./BrochureModal";

// -------------------- Types -------------------
interface NavLink {
    name: string;
    href?: string;
}

interface NavbarProps {
    sticky?: boolean;
    className?: string;
}

type FormData = {
    StudentName: string;
    StudentPhone: string;
};

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

const initialForm: FormData = {
    StudentName: "",
    StudentPhone: "",
};

// -------------------- Hamburger --------------------
const Hamburger = ({ open }: { open: boolean }) => (
    <span
        className="relative flex items-center justify-center w-8 h-8 transition-all duration-300"
        aria-hidden="true"
    >
        <span
            className={`absolute transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
        >
            <Image
                src="/logos/sort.svg"
                alt="Open menu"
                width={32}
                height={32}
                className="w-8 h-8 image-tag"
                priority
            />
        </span>
        <span
            className={`absolute transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        >
            <Image
                src="/logos/close.png"
                alt="Close menu"
                width={32}
                height={32}
                className="w-6 h-6 image-tag"
                priority
            />
        </span>
    </span>
);

// -------------------- Navbar --------------------
const Navbar = ({ sticky = true }: NavbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showBrochureModal, setShowBrochureModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState<FormData>(initialForm);

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const { StudentName, StudentPhone } = form;
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
                        StudentEmail: "null",
                        Address: "null",
                        City: "null",
                        State: "null",
                        District: "null",
                        PinCode: "null",
                    }),
                }
            );
            const payload = { name: brochureName, phone_number: StudentPhone };
            const response = await createAppoinmentRequest(payload);
            if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
                toast.error("Failed to submit the form. Please try again.");
                return;
            }
            toast.success("Form submitted successfully!");
            setForm(initialForm);
            setShowBrochureModal(false); // Close modal after submit
            // Download brochure
            const brochureUrl = "/pdf/brochure.pdf";
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

    return (
        <nav className={`navbar h-20 z-9999 bg-(--blue) w-full shadow-sm border-b border-(--grey-custom) ${sticky ? "fixed top-0 " : ""} transition-opacity duration-500 navbar--visible`}>
            <div className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full">
                {/* Navigation Menu */}
                <div className="flex items-center order-1 pl-6 sm:pl-8 sm:border-r border-(--grey-custom) ">
                    {/* Hamburger */}
                    <div className="xl:hidden mr-2" onClick={() => setMenuOpen((prev) => !prev)} role="button" tabIndex={0} aria-label="Open menu">
                        <Hamburger open={menuOpen} />
                    </div>
                    {/* Nav Links */}
                    <div className={`nav-elements fixed top-20 left-0 h-[calc(100vh-80px)] w-[280px] bg-(--blue) transition-transform duration-300 z-40 ${menuOpen ? "translate-x-0 px-6 py-8 shadow-lg" : "-translate-x-full px-6 py-8"} xl:static xl:h-auto xl:w-auto xl:bg-transparent xl:translate-x-0 xl:px-0 xl:py-0 xl:shadow-none xl:flex xl:items-center`}>
                        <ul className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0 mt-8 xl:mt-0">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name} className="relative group">
                                    <Link href={link.href ?? "#"} className={`text-base text-(--white-custom) transition-colors duration-200 relative py-2 ${isActive(link.href ?? "#") ? "border-b border-(--white-custom)" : "hover:border-b hover:border-(--white-custom)"}`} onClick={() => setMenuOpen(false)}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* Brochure Button */}
                        <div className="mt-6 xl:mt-0 xl:ml-4">
                            <button className="relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1" onClick={() => setShowBrochureModal(true)}>
                                <Paragraph size="base" className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">
                                    Brochure <GoDownload />
                                </Paragraph>
                                <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Logo */}
                <Link href="/" className="logo flex items-center justify-center order-2 pr-6 sm:pr-0">
                    <Image src="/logos/navbarlogo.png" alt="Company Logo" width={500} height={500} className="h-16 sm:h-12 w-auto object-contain image-tag" priority />
                </Link>
            </div>
            {/* Overlay for mobile menu */}
            {menuOpen && <div className="fixed inset-0 bg-(--black)/30 z-30 md:hidden" onClick={() => setMenuOpen(false)}></div>}
            {/* Brochure Modal */}
            <BrochureModal open={showBrochureModal} onClose={() => setShowBrochureModal(false)} form={form} onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} />
        </nav>
    );
};

export default Navbar;
