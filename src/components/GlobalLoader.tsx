"use client";
import Image from "next/image";
import "@/components/Styles/loader.css"

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 bg-(--white-custom)  flex items-center justify-center z-9999 transition-opacity duration-500 opacity-100">
      {/* Overlay noise background */}
      <div className="absolute inset-0 bg-[url('/designs/grainy.svg')] bg-cover bg-no-repeat pointer-events-none -z-10 opacity-[0.2]" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex item-center justify-center relative">
          <div className="relative w-24 h-24 sm:w-26 sm:h-26 lg:w-34 lg:h-34 flex items-center justify-center aspect-square">
            {/* Rotating SVG */}
            <div className="absolute inset-0 will-change-transform animate-spin-slow">
              <Image
                src="/designs/rotate.svg"
                alt="Rotating Ring"
                width={150}
                height={150}
                className="object-contain w-full h-full image-tag"
                priority
              />
            </div>
            {/* Centered static logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Image
                src="/logos/sri-maniya-institute-logo.png"
                alt="Sri Maniya Institute"
                width={120}
                height={120}
                className="object-contain w-12 h-12  lg:w-20 lg:h-20"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
