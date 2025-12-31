import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = await Visitor.aggregate([
      {
        $match: {
          visits: { $ne: [] },
        },
      },
      {
        $addFields: {
          lastVisit: { $last: "$visits" },
        },
      },
      {
        $addFields: {
          lastTime: { $ifNull: ["$lastVisit.endTime", "$lastVisit.startTime"] },
        },
      },
      {
        $match: {
          lastTime: { $gt: fiveMinutesAgo },
        },
      },
      {
        $count: "active",
      },
    ]);
    const active = result.length > 0 ? result[0].active : 0;
    return NextResponse.json({ active });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
