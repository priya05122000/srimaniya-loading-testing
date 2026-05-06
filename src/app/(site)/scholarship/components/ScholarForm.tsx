import Image from "next/image";
import LazyCaptcha from "@/components/LazyCaptcha";
import ScholarFormInner from "./ScholarFormInner";

const IMAGE_PROPS = {
  src: "/scholarship/scholarform.webp",
  alt: "Hotel management scholarship at Sri Maniya Institute",
  fill: true,
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw",
  className: "object-cover object-top",
  priority: true,
};

const ScholarForm: React.FC = () => {
  return (
    <div className="min-h-[100vh-80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
      <div
        className="flex items-center justify-center bg-(--blue) p-4 md:p-8"
        data-section
      >
        <div className="w-full max-w-xl">
          <h3 className="uppercase text-end mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Join With US
          </h3>
          <LazyCaptcha>
            <ScholarFormInner />
          </LazyCaptcha>
        </div>
      </div>
      <div className="relative w-full h-100 sm:h-auto">
        <Image {...IMAGE_PROPS} />
      </div>
    </div>
  );
};

export default ScholarForm;
