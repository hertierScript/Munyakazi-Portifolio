import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const count = await Visitor.countDocuments({});
    return NextResponse.json({ new: count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
