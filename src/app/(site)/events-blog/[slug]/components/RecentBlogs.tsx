"use client";
import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import Span from "@/components/common/Span";
import { ArrowLongLeft, ArrowLongRight } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";

import { getAllBlogPosts } from "@/services/blogPostService";
import Link from "next/link";

type Blog = {
  id: string;
  slug: string;
  sub_title: string;
  image_url: string;
  video_url: string;
  title: string;
  created_at: string;
};

const RecentBlogs: React.FC<{ blog_id?: string }> = ({ blog_id }) => {
  const [navigation, setNavigation] = useState<{
    prevEl: null | HTMLElement;
    nextEl: null | HTMLElement;
  }>({ prevEl: null, nextEl: null });

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBlogPosts();
        const blogsData = Array.isArray(res?.data)
          ? res.data.filter((b: unknown) => {
            return (
              typeof b === "object" &&
              b !== null &&
              "active" in b &&
              (b as { active: boolean }).active === true
            );
          })
          : [];
        const filteredBlogs = blogsData.filter((b: any) => b.id !== blog_id);
        setBlogs(filteredBlogs);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.error(
            "Failed to load blogs/categories:",
            (error as { message: string }).message
          );
        } else {
          console.error("Failed to load blogs/categories:", error);
        }
      }
    };
    fetchData();
  }, [blog_id]);

  const getVideoSrc = (videoUrl: string) => {
    // If videoUrl already contains 'videos/', don't add it again
    if (videoUrl.includes("videos/")) {
      return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${videoUrl}`;
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${videoUrl}`;
  };

  return (
    <LeftSpaceGridSection>
      <div className="pb-10 md:pb-16">
        <div className="mb-8">
          <Heading level={6} className="text-(--blue) leading-tight mt-2">
            Recent Blogs
          </Heading>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          loop={true}
          grabCursor={true}
          navigation={navigation}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
            1280: { slidesPerView: 4 }, // large desktop
          }}
        >
          {blogs.map((blog, idx) => (
            <SwiperSlide key={idx}>
              <Link hrefLang="en" href={`/events-blog/${blog.slug}`}>

                <div
                  className="overflow-hidden mx-auto relative cursor-pointer"
                // onClick={() => router.push(`/events-blog/${blog.slug}`)}
                >
                  <div className="w-full h-75 lg:h-87.5 aspect-3/2 sm:aspect-auto">
                    {blog.video_url ? (
                      <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      >
                        {blog.video_url.endsWith(".mp4") && (
                          <source
                            src={getVideoSrc(blog.video_url)}
                            type="video/mp4"
                          />
                        )}
                        {blog.video_url.endsWith(".webm") && (
                          <source
                            src={getVideoSrc(blog.video_url)}
                            type="video/webm"
                          />
                        )}
                        {blog.video_url.endsWith(".ogg") && (
                          <source
                            src={getVideoSrc(blog.video_url)}
                            type="video/ogg"
                          />
                        )}
                        {/* fallback if extension is not recognized */}
                        {blog.video_url &&
                          ![".mp4", ".webm", ".ogg"].some(
                            (ext) =>
                              blog.video_url && blog.video_url.endsWith(ext)
                          ) && <source src={getVideoSrc(blog.video_url)} />}
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`}
                        alt={blog.title}
                        priority={idx === 0}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-(--blue-overlay-strong) backdrop-blur-sm text-(--white) border-t border-grey-custom overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/designs/noise.svg')] opacity-50 mix-blend-overlay bg-cover bg-no-repeat" />
                    <div className="p-3 h-20 z-10 relative">
                      <Paragraph
                        size="lg"
                        className="mb-1 font-medium"
                      // {...ANIMATIONS.fadeZoomIn}
                      >
                        {blog.sub_title.slice(0, 30)}...
                      </Paragraph>
                      <div className="flex gap-1 items-baseline">
                        <Paragraph
                          // {...ANIMATIONS.fadeZoomIn}
                          size="lg"
                          className="font-bold"
                        >
                          {new Date(blog.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                          })}
                        </Paragraph>
                        <Paragraph
                          // {...ANIMATIONS.fadeZoomIn}
                          size="lg"
                          className="font-normal"
                        >
                          {new Date(blog.created_at).toLocaleDateString("en-GB", {
                            month: "long",
                          })}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-end mt-4 px-0 sm:px-8">
          <Span className="text-blue-custom">Prev/Nxt</Span>
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
              <ArrowLongLeft aria-label="Previous blog" />
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
              <ArrowLongRight aria-label="Next blog" />
            </button>
          </div>
        </div>
      </div>
    </LeftSpaceGridSection>
  );
};

export default RecentBlogs;
