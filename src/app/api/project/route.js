import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Project from "../../../models/project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find();

    return NextResponse.json({ projects });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
