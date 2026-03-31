import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 🚫 Block /courses/anything
    if (pathname.startsWith("/courses/") && pathname !== "/courses") {
        return NextResponse.redirect(new URL("/courses", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/courses/:path*"],
};