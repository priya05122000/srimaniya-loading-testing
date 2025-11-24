"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import GSAPScrollSmoother from "@/components/GSAPScrollSmoother";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { loading } = useGlobalLoader();

  return (
    <>
      <Navbar />
      <GSAPScrollSmoother loading={loading}>
        <main className="relative z-10 pt-20">
          {children}
        </main>
        <Footer />
      </GSAPScrollSmoother>
    </>
  );
};

export default ClientLayout;
