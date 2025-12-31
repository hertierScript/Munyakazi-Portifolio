import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Profile from "src/models/profile";

export async function GET() {
  try {
    await connectDB();
    const profile = (await Profile.findOne()) || {};
    return NextResponse.json({ profile });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const profileData = await req.json();

    // Update existing profile or create new one
    const profile = await Profile.findOneAndUpdate({}, profileData, {
      new: true,
      upsert: true,
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
