"use client";
import React, { useEffect, useState } from 'react';
import { getAllAlumniStories } from '@/services/alumniStoryService';
import Section from '@/components/common/Section';
import { FaQuoteLeft } from 'react-icons/fa';
import Paragraph from '@/components/common/Paragraph';
import Heading from '@/components/common/Heading';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Image from 'next/image';
import { useGlobalLoader } from '@/providers/GlobalLoaderProvider';
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';
import Span from '@/components/common/Span';

// Types
export type Alumni = {
  id: string;
  name: string;
  batch_year: number;
  course: string;
  location: string;
  designation: string;
  country: string;
  company: string;
  story: string;
  photo_url: string;
  video_url: string;
  status?: boolean;
};

// Utility: Get visible alumni for carousel (reusable)
const getVisibleAlumni = (alumniData: Alumni[], current: number, isMobile: boolean): (Alumni | undefined)[] => {
  const total = alumniData.length;
  if (isMobile) {
    // Only show the current alumni on mobile
    return [alumniData[current]];
  }
  return Array.from({ length: 5 }, (_, i) => alumniData[(current + i - 2 + total) % total]);
};

// Utility: Position and scale maps for carousel (reusable)
const positionMap = ["-300px", "-180px", "0px", "180px", "300px"] as const;
const scaleMapLg = ["1", "1.5", "1.25", "1.5", "1"] as const;
// const scaleMapMd = ["1", "1.5", "1.25", "1.5", "1"] as const;

// Reusable: Alumni image carousel item
const AlumniImage: React.FC<{
  alumni?: Alumni;
  idx: number;
  onClick: () => void;
  imageBase: string;
}> = ({ alumni, idx, onClick, imageBase }) => (
  <div
    className="absolute transition-all duration-500 ease-out cursor-pointer"
    onClick={onClick}
    style={{
      transform: `translateX(${positionMap[idx]})  scale(${scaleMapLg[idx]})`,
      zIndex: idx === 2 ? 10 : 1,
    }}
  >
    <div
      className={
        idx === 2
          ? "w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-(--blue) shadow-lg"
          : "w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden "
      }
    >
      {alumni?.photo_url ? (
        <Image
          src={imageBase + alumni.photo_url}
          alt={alumni.name}
          width={idx === 2 ? 144 : 80}
          height={idx === 2 ? 144 : 80}
          className={`w-full image-tag h-full object-top object-cover pointer-events-none  ${idx === 2 ? "" : "border-2 border-(--yellow)"} `}
          draggable={false}
          style={{ borderRadius: '9999px' }}
          priority={idx === 2}
        />
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  </div>
);

// Helper: Preload images and videos for alumni
const preloadAlumniMedia = (alumniList: Alumni[]) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`
    : '';
  const imagePromises = alumniList.map((a) => {
    if (!a.photo_url) return Promise.resolve();
    const img = new window.Image();
    img.src = base + a.photo_url;
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  });
  const videoPromises = alumniList
    .filter((a) => a.video_url)
    .map((a) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = a.video_url.includes('videos/') ? base + a.video_url : base + 'videos/' + a.video_url;
      return new Promise<void>((resolve) => {
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve();
      });
    });
  return Promise.all([...imagePromises, ...videoPromises]);
};

const AlumniStories = () => {
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { setLoading } = useGlobalLoader();
  const total = alumniData.length;
  const [isMobile, setIsMobile] = useState(false);

  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement | null>(null);
  const alumniRef = React.useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: alumniRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: !!alumniData.length,
  });

  // Touch swipe handlers for mobile
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide(); // swipe left
        else prevSlide(); // swipe right
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllAlumniStories();
        const raw: Alumni[] = res?.data ?? [];
        const active = raw.filter((a) => a.status);
        setAlumniData(active);
        await preloadAlumniMedia(active);
      } catch (err) {
        setAlumniData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  useEffect(() => {
    // Responsive check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current, isHovered, total]);

  const goTo = (steps: number) => setCurrent((prev) => (prev + steps + total) % total);
  const prevSlide = () => goTo(-1);
  const nextSlide = () => goTo(1);

  if (!alumniData.length) {
    return <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading...</div>;
  }

  const visible = getVisibleAlumni(alumniData, current, isMobile);
  const currentAlumni = alumniData[current];
  const imageBase = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`
    : '';

  return (
    <div ref={alumniRef}>
      <div className="pt-10 sm:pt-20 relative w-full">
        <Section>
          <div>
            <Paragraph ref={paragraphRef} size="lg" className="text-(--blue) font-bold alumni-title">The Proof</Paragraph>
            <Heading ref={headingRef} level={4} className="text-(--blue) uppercase leading-tight proof-title mt-1">Alumni Stories</Heading>
          </div>
        </Section>
        <div className='flex justify-center  items-center pt-10  gap-10 mb-4 '>
          <div className='w-full h-px bg-(--grey)' />
          <Heading level={3} className="text-(--blue)"><FaQuoteLeft style={{ stroke: 'var(--yellow)', strokeWidth: 10 }} /></Heading>
          <div className='w-full h-px bg-(--grey)' />
        </div>
        <Section>
          <div className='h-[450px] sm:h-[490px] flex flex-col justify-between text-center '>
            {currentAlumni && (
              <>
                <span className="text-xs block sm:hidden  font-semibold leading-relaxed  text-(--blue)">
                  <span dangerouslySetInnerHTML={{ __html: currentAlumni.story }} />
                </span>
                <Paragraph size='lg' className="max-w-3xl hidden sm:block mx-auto font-semibold leading-relaxed  text-(--blue)">
                  <span dangerouslySetInnerHTML={{ __html: currentAlumni.story }} />
                </Paragraph>
              </>
            )}
            <div>
              <div
                className={`flex  justify-center items-center mb-6 sm:mb-10 relative ${isMobile ? 'h-24' : 'h-40'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...(isMobile ? {
                  onTouchStart: handleTouchStart,
                  onTouchMove: handleTouchMove,
                  onTouchEnd: handleTouchEnd
                } : {})}
              >
                {visible.map((alumni, idx) => (
                  <AlumniImage
                    key={alumni?.id || `empty-${idx}`}
                    alumni={alumni}
                    idx={isMobile ? 2 : idx}
                    onClick={() => {
                      if (isMobile) return; // No click navigation on mobile images
                      if (idx === 1) goTo(-1);
                      if (idx === 0) goTo(-2);
                      if (idx === 3) goTo(1);
                      if (idx === 4) goTo(2);
                    }}
                    imageBase={imageBase}
                  />
                ))}
              </div>
              {currentAlumni && (
                <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline gap-2 mb-1">
                  <Paragraph size='xl' className="font-bold text-(--blue)">{currentAlumni.name}</Paragraph>
                  <Paragraph size='base' className="text-(--dark)">({currentAlumni.batch_year} batch - {currentAlumni.course})</Paragraph>
                </div>
              )}
              {currentAlumni && (
                <Paragraph size='base' className="  text-(--dark) mb-6">{currentAlumni.designation} - {currentAlumni.company}{currentAlumni.location ? `, ${currentAlumni.location}` : ''}{currentAlumni.country ? `, ${currentAlumni.country}` : ''}</Paragraph>
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevSlide}
                  className="border border-(--blue)   text-2xl text-(--blue)  hover:bg-(--blue) hover:text-white    rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                  aria-label="Previous"
                >
                  <HiOutlineArrowNarrowLeft />
                </button>
                <button
                  onClick={nextSlide}
                  className="border border-(--blue)   text-2xl text-(--blue)  hover:bg-(--blue) hover:text-white    rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                  aria-label="Next"
                >
                  <HiOutlineArrowNarrowRight />
                </button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AlumniStories;
