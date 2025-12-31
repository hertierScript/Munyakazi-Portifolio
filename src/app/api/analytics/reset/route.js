import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function POST(request) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get("admin_session");
    if (!sessionCookie) {F
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [adminId, signature] = sessionCookie.value.split(":");
    if (!adminId || !signature) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ADMIN_SECRET)
      .update(adminId)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await Visitor.deleteMany({});
    return NextResponse.json({ message: "Analytics data reset successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
