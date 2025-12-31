import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Project from "src/models/project";

export async function GET(request, { params }) {
  const { id } = await params;
  await connectDB();

  const project = await Project.findById(id);

  if (!project) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ project }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const { title, description, github, live, thumbnail, tags } =
      await request.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        github,
        live,
        thumbnail,
        tags: Array.isArray(tags)
          ? tags
          : tags.split(",").map((tag) => tag.trim()),
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
