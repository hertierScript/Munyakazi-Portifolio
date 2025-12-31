import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const result = await Visitor.aggregate([
      { $unwind: "$visits" },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 }, // top 10
    ]);
    const total = result.reduce((sum, item) => sum + item.count, 0);
    const data = result.map((item) => ({
      country: item._id,
      count: item.count,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }));
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
