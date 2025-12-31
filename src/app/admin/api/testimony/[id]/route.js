import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Testimony from "src/models/testimony";

export async function GET(request, { params }) {
  const { id } = await params; // params must be awaited
  await connectDB();

  const testimony = await Testimony.findById(id); // simpler than findOne({_id: id})

  if (!testimony) {
    return NextResponse.json(
      { message: "Testimony not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ testimony }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const { fullname, role, testimony: testimonyText } = await request.json();

    const updatedTestimony = await Testimony.findByIdAndUpdate(
      id,
      { fullname, role, testimony: testimonyText },
      { new: true }
    );

    if (!updatedTestimony) {
      return NextResponse.json(
        { message: "Testimony not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTestimony, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deletedTestimony = await Testimony.findByIdAndDelete(id);

    if (!deletedTestimony) {
      return NextResponse.json(
        { message: "Testimony not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Testimony deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
