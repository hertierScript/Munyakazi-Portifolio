import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Testimony from "@/models/testimony";

export async function GET() {
  await connectDB();
  const testimonies = await Testimony.find();

  return NextResponse.json({ testimonies });
}
