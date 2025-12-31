import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Current average
    const currentVisitors = await Visitor.find({});
    let currentTotalTime = 0;
    let currentCount = 0;
    currentVisitors.forEach((visitor) => {
      visitor.visits.forEach((visit) => {
        if (visit.endTime) {
          const duration =
            (new Date(visit.endTime) - new Date(visit.startTime)) / 1000;
          currentTotalTime += duration;
          currentCount++;
        }
      });
    });
    const currentAverage =
      currentCount > 0 ? currentTotalTime / currentCount : 0;

    // Previous average (before last week)
    const previousVisitors = await Visitor.find({
      createdAt: { $lt: oneWeekAgo },
    });
    let previousTotalTime = 0;
    let previousCount = 0;
    previousVisitors.forEach((visitor) => {
      visitor.visits.forEach((visit) => {
        if (visit.endTime) {
          const duration =
            (new Date(visit.endTime) - new Date(visit.startTime)) / 1000;
          previousTotalTime += duration;
          previousCount++;
        }
      });
    });
    const previousAverage =
      previousCount > 0 ? previousTotalTime / previousCount : 0;

    return NextResponse.json({
      average: Math.round(currentAverage),
      previousAverage: Math.round(previousAverage),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
