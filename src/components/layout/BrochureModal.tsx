import React, { FC, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import Image from "next/image";
import { InputField } from "@/components/ui/FormFields";
import Paragraph from "../common/Paragraph";

export type BrochureFormData = {
    StudentName: string;
    StudentPhone: string;
};

interface BrochureModalProps {
    open: boolean;
    onClose: () => void;
    form: BrochureFormData;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    submitting: boolean;
}

const BrochureModal: FC<BrochureModalProps> = ({ open, onClose, form, onChange, onSubmit, submitting }) => (
    <AnimatePresence>
        {open && (
            <motion.div className="fixed inset-0 z-100 flex items-center justify-center bg-(--grey-custom)/40 p-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <motion.div className="bg-(--blue) shadow-lg p-6 max-w-lg w-full relative"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <button className="absolute top-2 right-2 cursor-pointer text-2xl" onClick={onClose} aria-label="Close">
                        <IoClose />
                    </button>
                    <div className="mb-8 flex justify-center">
                        <Image src="/logos/navbarlogo.png" alt="Logo" width={376} height={94} className="w-48 md:w-72" priority />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 mt-5">
                        <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                            <InputField label="Name *" name="StudentName" required value={form.StudentName} onChange={onChange} />
                            <InputField label="Phone Number *" name="StudentPhone" type="tel" required value={form.StudentPhone} onChange={onChange} pattern="[0-9]{10}" maxLength={10} />
                        </div>
                        <div className="flex flex-row justify-end my-4 gap-2">
                            <button type="submit" className="relative flex justify-center items-center gap-1 rounded bg-(--yellow) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-4 py-1" disabled={submitting}>
                                <Paragraph size="base" className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--yellow)">
                                    Download Brochure <GoDownload />
                                </Paragraph>
                                <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default BrochureModal;
