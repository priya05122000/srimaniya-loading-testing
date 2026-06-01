import { Phone, WhatsApp } from "@/components/icons/Icons";

function whatsappUrl() {
  const phone = "+918903864444";
  const text = "Hi! I want to know more.";
  return `https://wa.me/${phone.replace(/^\+/, "")}?text=${encodeURIComponent(text)}`;
}

export default function FloatingContactButtons({ isBlueSection }: { isBlueSection: boolean }) {
  return (
    <div
      className={`fixed bottom-8 right-6 sm:right-8 z-50 font-bold flex flex-col gap-4 items-center justify-center rounded-full transition-colors duration-300 ease-in-out overflow-hidden py-3 px-2 shadow-[0_4px_24px_0_rgba(11,35,81,0.15)] backdrop-blur-sm
        ${isBlueSection
          ? "bg-white/50 text-(--blue)"
          : "bg-(--blue)/50 text-(--white-custom)"
        }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <button
        type="button"
        aria-label="Call Phone"
        onClick={() => window.open("tel:+918903864444")}
        className="cursor-pointer"
      >
        <Phone aria-label="Call Phone" className="w-8 h-8" />
      </button>
      <button
        type="button"
        aria-label="Open WhatsApp chat"
        onClick={() =>
          window.open(whatsappUrl(), "_blank", "noopener,noreferrer")
        }
        className="cursor-pointer"
      >
        <WhatsApp aria-label="Open WhatsApp chat" className="w-8 h-8" />
      </button>
    </div>
  );
}