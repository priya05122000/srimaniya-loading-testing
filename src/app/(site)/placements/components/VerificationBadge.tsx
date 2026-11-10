import React from "react";
import { BadgeCheck } from "@/components/icons/Icons";

export type VerificationDocument = {
  id: string;
  verification_label: string;
  document_type?: string | null;
  file_url?: string | null;
  status?: string;
};

export const documentUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;

export const isPdfDocument = (path?: string | null) =>
  !!path && /\.pdf($|[?#])/i.test(path);

/**
 * Verified documents that have something to show (a label and/or a file).
 * All admin fields are optional, so either may be missing.
 * The API already filters by status; this is a defensive second check.
 */
export const getVerifiedDocuments = (
  documents?: VerificationDocument[] | null
): VerificationDocument[] =>
  (documents ?? []).filter(
    (doc) =>
      !!doc &&
      (doc.status === undefined || doc.status === "verified") &&
      (!!doc.file_url || !!doc.verification_label?.trim())
  );

/** Verified documents with a file — the ones that can be previewed / opened. */
export const getViewableDocuments = (
  documents?: VerificationDocument[] | null
): VerificationDocument[] =>
  getVerifiedDocuments(documents).filter((doc) => !!doc.file_url);

type VerificationBadgeProps = {
  label: string;
  title?: string;
  onClick?: () => void;
  className?: string;
  /** "dark" = on the blue card (outlined green), "light" = on white (filled light green). */
  variant?: "dark" | "light";
};

/** Verified badge, styled with the site's existing blue / yellow palette. */
const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  label,
  title,
  onClick,
  className = "",
  variant = "dark",
}) => {
  const colors =
    variant === "light"
      ? "border-(--green) bg-(--green-light) text-(--green)"
      : "border-(--green-bright) text-(--green-bright)";
  // leading-tight + text-left so long labels wrap cleanly in narrow cards.
  const classes = `inline-flex items-center gap-1.5 border ${colors} px-2 py-1 text-[11px] leading-tight text-left font-semibold uppercase tracking-wide font-inter ${className}`;

  if (!onClick) {
    return (
      <span className={classes} title={title}>
        <BadgeCheck className="shrink-0 text-sm" />
        {label}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`${classes} cursor-pointer transition-colors hover:bg-(--green-bright) hover:text-(--blue)`}
    >
      <BadgeCheck className="shrink-0 text-sm" />
      {label}
    </button>
  );
};

export default VerificationBadge;
