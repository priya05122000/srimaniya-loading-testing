import React from "react";

type ParagraphListSize = "xl" | "lg" | "base";

interface ParagraphListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
    children: React.ReactNode;
    className?: string;
    as?: "ul" | "ol";
    listStyle?: "disc" | "none" | "decimal";
    noMargin?: boolean; // disables default ml-6
    size?: ParagraphListSize;
}

const sizeClasses: Record<ParagraphListSize, string> = {
    xl: "text-lg sm:text-xl lg:text-2xl",
    lg: "text-base lg:text-lg",
    base: "text-sm lg:text-base",
};

const ParagraphList: React.FC<ParagraphListProps> = ({
    children,
    className = "",
    as = "ul",
    listStyle = "disc",
    noMargin = false,
    size = "base",
    ...rest
}) => {
    const ListTag = as;

    const listStyleClass =
        listStyle === "disc"
            ? "list-disc"
            : listStyle === "decimal"
            ? "list-decimal"
            : "list-none";

    const marginClass = noMargin ? "ml-0" : "ml-4";

    return (
        <ListTag
            className={`${sizeClasses[size]} font-inter ${className} ${marginClass} ${listStyleClass}`}
            {...rest}
        >
            {children}
        </ListTag>
    );
};

export default ParagraphList;