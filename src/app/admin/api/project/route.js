import { NextResponse } from "next/server";
import connectDB from "../../../../libs/mongodb";
import Project from "../../../../models/project";

export async function POST(req) {
  try {
    await connectDB();

    const { title, description, github, live, thumbnail, tags } =
      await req.json();

    const newProject = await Project.create({
      title,
      description,
      github,
      live,
      thumbnail,
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const projects = await Project.find();

  return NextResponse.json({ projects });
}
