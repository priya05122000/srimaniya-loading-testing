"use client";
import React, { useState, useRef, useEffect } from "react";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import Section from "@/components/common/Section";
import { useRouter } from "next/navigation";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

import { getAllBlogPosts } from "@/services/blogPostService";
import { getAllCategories } from "@/services/categoryService";
import Span from "@/components/common/Span";

interface Blog {
    id: string;
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

// Helper: Preload images (reusable)
const preloadImages = (blogs: Blog[]) => {
    return Promise.all(
        blogs.map((b) => {
            const img = new window.Image();
            img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${b.image_url}`;
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })
    );
};



const EventAndBlog: React.FC = () => {
    const router = useRouter();
    const eventsBlogRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useSplitTextHeadingAnimation({
        trigger: eventsBlogRef,
        first: headingRef,
        delay: 0.3,
        enabled: true,
    });

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [active, setActive] = useState("");
    const { setLoading } = useGlobalLoader();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [blogResult, categoryResult] = await Promise.all([
                    getAllBlogPosts(),
                    getAllCategories(),
                ]);
                const blogsData = Array.isArray(blogResult?.data)
                    ? blogResult.data.filter((b: unknown) => {
                        return (
                            typeof b === "object" &&
                            b !== null &&
                            "active" in b &&
                            (b as { active: boolean }).active === true
                        );
                    })
                    : [];
                setBlogs(blogsData);
                await preloadImages(blogsData);
                const cats = categoryResult?.data || [];
                setCategories(cats);
                if (cats.length > 0) setActive(cats[0].id);
            } catch (error: unknown) {
                if (error && typeof error === "object" && "message" in error) {
                    console.error("Failed to load blogs/categories:", (error as { message?: string }).message);
                } else {
                    console.error("Failed to load blogs/categories:", error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setLoading]);

    const filteredBlogs = blogs.filter((blog) => blog.category_id === active);
    const handleBlogClick = (id: string) => router.push(`/events-blog-view?id=${id}`);

    // Reusable category button
    const CategoryButton: React.FC<{ cat: Category; active: string; setActive: (id: string) => void }> = React.memo(({ cat, active, setActive }) => (
        <button
            type="button"
            onClick={() => setActive(cat.id)}
            className={`relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border-none group transition-all duration-300 min-w-[100px] px-2 ${active === cat.id ? "bg-(--blue)" : "bg-(--white-custom) border border-(--blue)"}`}
        >
            <span className={`relative z-20 text-center no-underline w-full px-2 py-2 text-base transition-all duration-300 ${active === cat.id ? "text-(--white-custom)" : "text-(--blue) group-hover:text-(--white-custom)"}`}>
                {cat.name === "News&Events" ? 'Events' : cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </span>
            <span className={`absolute left-0 top-0 w-full h-0 transition-all duration-300 ease-in-out z-10 ${active === cat.id ? "bg-(--white-custom)" : "bg-(--blue) group-hover:h-full group-hover:top-auto group-hover:bottom-0"}`} />
        </button>
    ));
    CategoryButton.displayName = "CategoryButton";

    return (
        <div ref={eventsBlogRef}>
            <div className="py-10 sm:py-20" >
                <Section>
                    <div>
                        <div>
                            <Heading ref={headingRef} level={4} className="font-semibold text-(--blue) mb-2 events-blog-heading leading-tight uppercase">Events & Blog</Heading>
                        </div>
                        <div className="flex justify-end gap-4 mb-4 mt-4 md:mt-0 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-0 md:px-4 lg:px-12 xl:px-0">
                            {categories.map((cat) => (
                                <CategoryButton key={cat.id} cat={cat} active={active} setActive={setActive} />
                            ))}
                        </div>
                    </div>
                </Section>
                <LeftSpaceGridSection>
                    <div className="pt-6 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, idx) => (
                                <div key={blog.id} className="overflow-hidden relative">
                                    <div className="w-full">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${blog.image_url}`}
                                            onClick={() => handleBlogClick(blog.id)}
                                            alt={blog.title}
                                            className="w-full h-[280px] object-cover object-bottom cursor-pointer"
                                            width={500}
                                            height={500}
                                            priority={idx === 0}
                                        />
                                    </div>

                                    <div className="pt-3  z-10 relative text-(--blue)">
                                        <Paragraph size="xl" className="mb-3 font-medium underline underline-offset-6 decoration-1 cursor-pointer leading-snug" onClick={() => handleBlogClick(blog.id)}>{blog.sub_title}</Paragraph>

                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    blog.description
                                                        .split(/\s+/)
                                                        .slice(0, 30)
                                                        .join(" ") +
                                                    (blog.description.split(/\s+/).length > 30 ? "..." : "")
                                            }}
                                        />

                                        <div className="flex items-baseline mt-2">
                                            <span className="font-bold text-xs">
                                                {new Date(blog.created_at).toLocaleDateString("en-GB", { day: "2-digit" })}
                                            </span>
                                            <span className="font-normal text-xs">
                                                {new Date(blog.created_at).toLocaleDateString("en-GB", { month: "long" })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </LeftSpaceGridSection>
            </div>
        </div>
    );
}

export default EventAndBlog


