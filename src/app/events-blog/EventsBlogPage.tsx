import React from "react";
import EventAndBlog from "./components/EventAndBlog";

const EventsBlogPage = ({
    blogs,
    categories,
}: {
    blogs: any[];
    categories: any[];
}) => {
    return (
        <div>
            <EventAndBlog blogs={blogs} categories={categories} />
        </div>
    );
};

export default EventsBlogPage;