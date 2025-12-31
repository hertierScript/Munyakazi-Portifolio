import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Current total
    const currentResult = await Visitor.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $size: "$visits" } },
        },
      },
    ]);
    const current = currentResult.length > 0 ? currentResult[0].total : 0;

    // Last week total
    const lastWeekResult = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $size: "$visits" } },
        },
      },
    ]);
    const lastWeek = lastWeekResult.length > 0 ? lastWeekResult[0].total : 0;

    const percentageChange = lastWeek > 0 ? ((current - lastWeek) / lastWeek) * 100 : 0;

    return NextResponse.json({ total: current, percentageChange: Math.round(percentageChange) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
