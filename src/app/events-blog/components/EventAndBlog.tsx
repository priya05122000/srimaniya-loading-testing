"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/common/Section";
import { useRouter } from "next/navigation";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";


interface Blog {
  id: string;
  slug: string;
  image_url: string;
  title: string;
  sub_title: string;
  description: string;
  created_at: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}



const EventAndBlog = ({
  blogs,
  categories,
}: {
  blogs: Blog[];
  categories: Category[];
}) => {
  const router = useRouter();
  const eventsBlogRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const { setLoading } = useGlobalLoader();


  useSplitTextHeadingAnimation({
    trigger: eventsBlogRef,
    first: headingRef,
    delay: 0.3,
    enabled: true,
  });

  const [active, setActive] = useState<string>("");


  // ✅ Set after mount (SAFE)
  useEffect(() => {
    if (categories.length > 0) {
      const saved = sessionStorage.getItem("eventsBlogActiveCategory");
      setActive(saved || categories[0].id);
    }
  }, [categories]);

  // ✅ Save selection
  useEffect(() => {
    if (active) {
      sessionStorage.setItem("eventsBlogActiveCategory", active);
    }
  }, [active]);


  const filteredBlogs = blogs.filter(
    (blog) => blog.category_id === active
  );

  const handleBlogClick = (slug: string) =>
    router.push(`/events-blog/${slug}`);


  const CategoryButton: React.FC<{
    cat: Category;
    active: string;
    setActive: (id: string) => void;
  }> = React.memo(({ cat, active, setActive }) => (
    <button
      type="button"
      onClick={() => setActive(cat.id)}
      className={`relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border-none group transition-all duration-300 sm:min-w-25 px-2 ${active === cat.id
        ? "bg-(--blue)"
        : "bg-(--white-custom) border border-(--blue)"
        }`}
    >
      <span
        className={`relative z-20 text-center no-underline w-full px-2 py-2 text-sm sm:text-base transition-all duration-300 ${active === cat.id
          ? "text-(--white-custom)"
          : "text-(--blue) group-hover:text-(--white-custom)"
          }`}
      >
        {cat.name === "News&Events"
          ? "Events"
          : cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
      </span>
      <span
        className={`absolute left-0 top-0 w-full h-0 transition-all duration-300 ease-in-out z-10 ${active === cat.id
          ? "bg-(--white-custom)"
          : "bg-(--blue) group-hover:h-full group-hover:top-auto group-hover:bottom-0"
          }`}
      />
    </button>
  ));
  CategoryButton.displayName = "CategoryButton";

  return (
    <div ref={eventsBlogRef}>
      <div className="py-10 sm:py-20">
        <Section>
          <div>
            <div>
              <h1
                ref={headingRef}
                className="font-bold text-3xl sm:text-4xl lg:text-5xl  text-(--blue) mb-2 events-blog-heading leading-tight uppercase"
              >
                Events & Blog
              </h1>
              <h2 className="sr-only">
                Hotel Management Events and Blogs
              </h2>
            </div>

            <div className="flex justify-end gap-4 mb-4 mt-10 sm:mt-4 md:mt-0 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-0 md:px-4 lg:px-12 xl:px-0">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  cat={cat}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </div>
          </div>

          <div className="pt-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <div key={blog.id} className="overflow-hidden relative">
                  <div className="w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`}
                      alt="Hotel management training at Sri Maniya Institute" onClick={() => handleBlogClick(blog.slug)}
                      className="w-full h-70 object-cover object-center cursor-pointer image-tag"
                      width={500}
                      height={500}
                      priority={idx === 0}
                      unoptimized
                    />
                  </div>

                  <div className="pt-3  z-10 relative text-(--blue)">
                    <p
                      className="mb-3 text-base lg:text-lg font-medium underline underline-offset-6 decoration-1 cursor-pointer leading-snug"
                      onClick={() => handleBlogClick(blog.slug)}
                    >
                      {blog.sub_title}
                    </p>

                    <span
                      className="text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.description
                      }}
                    />


                    <div className="flex items-baseline mt-2">
                      <span className="font-bold text-xs">
                        {new Date(blog.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                        })}
                      </span>
                      <span className="font-normal text-xs">
                        {new Date(blog.created_at).toLocaleDateString("en-GB", {
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default EventAndBlog;