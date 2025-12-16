"use client";
import { usePathname } from "next/navigation";
import GlobalLoader from "./GlobalLoader";

export default function ConditionalGlobalLoader() {
  const pathname = usePathname();
  if (pathname === "/registration-form") return null;
  return <GlobalLoader />;
}
