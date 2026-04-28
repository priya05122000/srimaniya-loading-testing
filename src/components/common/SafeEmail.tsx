"use client";

import React, { useEffect, useState } from "react";

interface SafeEmailProps {
    email: string;
    className?: string;
}

const SafeEmail: React.FC<SafeEmailProps> = ({ email, className }) => {
    const [safeEmail, setSafeEmail] = useState("");

    useEffect(() => {
        // Build email dynamically (not present in initial HTML)
        const parts = email.split("@");
        if (parts.length === 2) {
            setSafeEmail(parts[0] + "@" + parts[1]);
        }
    }, [email]);

    if (!safeEmail) return null;

    return (
        <a href={`mailto:${safeEmail}`} hrefLang="en" className={className}>
            {safeEmail}
        </a>
    );
};

export default SafeEmail;