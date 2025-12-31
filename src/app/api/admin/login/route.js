import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hardcoded credentials
    const adminEmail = "hertiermunyakazi@gmail.com";
    const adminPassword = "Kalifv@12";

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a signed session token
    const adminId = "admin";
    const sessionToken = `${adminId}:${crypto.createHmac("sha256", process.env.ADMIN_SECRET).update(adminId).digest("hex")}`;

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
