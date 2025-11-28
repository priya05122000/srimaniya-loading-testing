import { FaArrowUpLong } from "react-icons/fa6";

export default function BackToTopButton({
  isBlueSection,
  scrollProgress,
  show,
}: {
  isBlueSection: boolean;
  scrollProgress: number;
  show: boolean;
}) {
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed hidden  bottom-8 left-6 sm:left-8 z-9999 p-2 sm:p-3 rounded-full cursor-pointer transition sm:flex items-center justify-center
        ${isBlueSection ? "text-white" : "text-(--blue)"}`}
      aria-label="Back to top"
      style={{
        width: 44,
        height: 44,
        minWidth: 44,
        minHeight: 44,
        maxWidth: 56,
        maxHeight: 56,
      }}
    >
      <svg
        className="absolute left-0 top-0"
        width="44"
        height="44"
        viewBox="0 0 56 56"
        style={{
          pointerEvents: "none",
          maxWidth: 56,
          maxHeight: 56,
          minWidth: 44,
          minHeight: 44,
          width: "100%",
          height: "100%",
        }}
      >
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke={isBlueSection ? "#EEECEA" : "#0b2351"}
          strokeWidth="4"
          opacity="0.2"
        />
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke={isBlueSection ? "#EEECEA" : "#0b2351"}
          strokeWidth="4"
          strokeDasharray={2 * Math.PI * 24}
          strokeDashoffset={(1 - scrollProgress) * 2 * Math.PI * 24}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center w-full h-full">
        <FaArrowUpLong className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
    </button>
  );
}