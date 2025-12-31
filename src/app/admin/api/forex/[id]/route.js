import { NextResponse } from "next/server";
import connectDB from "src/libs/mongodb";
import Forex from "src/models/forex";

export async function GET(request, { params }) {
  const { id } = await params;
  await connectDB();

  const forexStudy = await Forex.findById(id);

  if (!forexStudy) {
    return NextResponse.json(
      { message: "Forex study not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ forexStudy }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const { title, description, thumbnail, week } = await request.json();

    const updatedForex = await Forex.findByIdAndUpdate(
      id,
      {
        title,
        description,
        thumbnail,
        week,
      },
      { new: true }
    );

    if (!updatedForex) {
      return NextResponse.json(
        { message: "Forex study not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedForex, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deletedForex = await Forex.findByIdAndDelete(id);

    if (!deletedForex) {
      return NextResponse.json(
        { message: "Forex study not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Forex study deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
