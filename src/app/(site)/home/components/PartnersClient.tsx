"use client";
import dynamic from "next/dynamic";
const Partners = dynamic(() => import("./Partners"), { ssr: false });
export default Partners;
