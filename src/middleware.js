import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const [adminId, signature] = sessionCookie.value.split(":");

    if (!adminId || !signature) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.ADMIN_SECRET)
      .update(adminId)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // For hardcoded admin, no DB check needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
