import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Forex from "src/models/forex";

export async function GET() {
  await connectDB();
  const forexStudies = await Forex.find();

  return NextResponse.json({ forexStudies });
}
