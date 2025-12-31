import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Profile from "@/models/profile";

export async function GET() {
  try {
    await connectDB();
    const profile = (await Profile.findOne()) || {};

    // Return profile data for public access
    return NextResponse.json({ profile });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
