import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Forex from "src/models/forex";

export async function POST(req) {
  try {
    await connectDB();

    const { title, description, thumbnail, week } = await req.json();

    const newForex = await Forex.create({
      title,
      description,
      thumbnail,
      week,
    });

    return NextResponse.json(newForex, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const forexStudies = await Forex.find();

  return NextResponse.json({ forexStudies });
}
