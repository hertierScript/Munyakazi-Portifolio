import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const result = await Visitor.aggregate([
      { $unwind: "$visits" },
      { $match: { "visits.startTime": { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$visits.startTime" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const data = result.map((item) => ({
      date: item._id,
      visits: item.count,
    }));
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}