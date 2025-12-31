import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Testimony from "@/models/testimony";

export async function POST(req) {
  try {
    await connectDB();

    const { fullname, role, testimony } = await req.json();

    const newTestimony = await Testimony.create({
      fullname,
      role,
      testimony,
    });

    return NextResponse.json(newTestimony, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const testimonies = await Testimony.find().lean();

  return NextResponse.json({ testimonies });
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectDB();

    await Testimony.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Testimony Deleted Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
