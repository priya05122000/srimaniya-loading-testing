"use client";
import Heading from '@/components/common/Heading';
import LeftSpaceGridSection from '@/components/common/LeftSpaceGridSection';
import Paragraph from '@/components/common/Paragraph';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from 'next/image';
import Span from '@/components/common/Span';
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
import { useGlobalLoader } from '@/providers/GlobalLoaderProvider';
import { getAllBlogPosts } from "@/services/blogPostService";
import { useRouter } from 'next/navigation';
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';

// Reusable type for Blog
export type Blog = {
  id: string;
  image_url: string;
  video_url: string;
  title: string;
  sub_title: string;
  created_at: string;
};

// Helper: Preload images and videos (reusable)
const preloadMedia = (blogs: Blog[]) => {
  const base = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`;
  const imagePromises = blogs.map((p) => {
    const img = new window.Image();
    img.src = `${base}${p.image_url}`;
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  });
  const videoPromises = blogs
    .filter((p) => p.video_url)
    .map((p) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = p.video_url.includes('videos/') ? `${base}${p.video_url}` : `${base}videos/${p.video_url}`;
      return new Promise<void>((resolve) => {
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve();
      });
    });
  return Promise.all([...imagePromises, ...videoPromises]);
};

// Helper: Get video sources (reusable)
const getVideoSources = (videoUrl: string) => {
  const base = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`;
  const src = videoUrl.includes("videos/") ? `${base}${videoUrl}` : `${base}videos/${videoUrl}`;
  const sources = [
    { ext: ".mp4", type: "video/mp4" },
    { ext: ".webm", type: "video/webm" },
    { ext: ".ogg", type: "video/ogg" },
  ];
  const matched = sources.find(({ ext }) => videoUrl.endsWith(ext));
  if (matched) {
    return [<source key={matched.ext} src={src} type={matched.type} />];
  }
  return [<source key="default" src={src} />];
};

// BlogCard: Reusable blog card for Swiper
const BlogCard: React.FC<{ blog: Blog; idx: number; onClick: () => void }> = ({ blog, idx, onClick }) => (
  <div className="overflow-hidden mx-auto relative cursor-pointer" onClick={onClick}>
    <div className="w-full h-[300px] aspect-3/2 sm:aspect-auto">
      {blog.video_url ? (
        <video autoPlay loop muted className="w-full h-full object-cover">
          {getVideoSources(blog.video_url)}
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${blog.image_url}`}
          alt={`Sri Maniya Institute of Hotel Management Event/Blog - ${blog.title}, hotel management in tamil nadu, career opportunities in hotel management, hospitality management courses in tamilnadu`}
          priority={idx === 0}
          className="w-full h-full object-cover image-tag"
          width={500}
          height={500}
          unoptimized
        />
      )}
    </div>
    <div className="absolute bottom-0 left-0 w-full bg-(--blue-overlay-strong) backdrop-blur-sm text-(--white-custom) border-t border-(--grey-custom) overflow-hidden" data-section>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/designs/noise.svg')] opacity-50 mix-blend-overlay bg-cover bg-no-repeat" />
      <div className="p-3  z-10 relative flex flex-col justify-between">
        {/* <Paragraph size="base" className="font-bold leading-snug">
          {blog.sub_title}
        </Paragraph> */}

        <Paragraph size="base" className="mb-1 font-medium leading-relaxed">
          {blog.sub_title.length > 20 ? blog.sub_title.slice(0, 20) + '...' : blog.sub_title}
        </Paragraph>
        <div className="flex items-baseline">
          <span className="font-bold text-xs">
            {new Date(blog.created_at).toLocaleDateString("en-GB", { day: "2-digit" })}
          </span>
          <span className="font-normal text-xs">
            {new Date(blog.created_at).toLocaleDateString("en-GB", { month: "long" })}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const EventsBlogs: React.FC = () => {
  const [navigation, setNavigation] = useState<{ prevEl: null | HTMLElement; nextEl: null | HTMLElement; }>({ prevEl: null, nextEl: null });
  const { setLoading } = useGlobalLoader();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  // SplitText animation refs
  const eventsRef = React.useRef<HTMLDivElement | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: eventsRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: blogs.length > 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getAllBlogPosts();
        const blogsData = Array.isArray(res?.data)
          ? res.data.filter((b: unknown) =>
            typeof b === "object" &&
            b !== null &&
            "active" in b &&
            (b as { active: boolean }).active === true
          )
          : [];
        setBlogs(blogsData);
        await preloadMedia(blogsData); // Preload images and videos
      } catch (err) {
        console.error("Failed to fetch blogs/categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setLoading]);

  return (
    <div ref={eventsRef}>
      <LeftSpaceGridSection>
        <div className="py-10 sm:py-20">
          <div className="mb-8">
            <Paragraph ref={paragraphRef} size="lg" className="text-(--blue) font-bold news-title">
              Events & Blogs
            </Paragraph>
            <Heading ref={headingRef} level={4} className="text-(--blue) mt-1 leading-tight uppercase latest-title">
              Latest from Us
            </Heading>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={5}
            loop
            grabCursor={true}
            navigation={navigation}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {blogs.map((blog, idx) => (
              <SwiperSlide key={blog.id}>
                <BlogCard blog={blog} idx={idx} onClick={() => router.push(`/events-blog-view?id=${blog.id}`)} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col items-end mt-4 px-0 sm:px-8">
            <Span className="text-(--blue)">Prev/Nxt</Span>
            <div className="flex items-center space-x-4 mt-2">
              <button
                ref={(node) => {
                  if (node && navigation.prevEl !== node)
                    setNavigation((nav) => ({ ...nav, prevEl: node }));
                }}
                className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
                aria-label="Previous"
                type="button"
              >
                <CgArrowLongLeft />
              </button>
              <button
                ref={(node) => {
                  if (node && navigation.nextEl !== node)
                    setNavigation((nav) => ({ ...nav, nextEl: node }));
                }}
                className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
                aria-label="Next"
                type="button"
              >
                <CgArrowLongRight />
              </button>
            </div>
          </div>
        </div>
      </LeftSpaceGridSection>

    </div>
  );
};

export default EventsBlogs;
