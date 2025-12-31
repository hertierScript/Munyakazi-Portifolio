import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Visitor from "@/models/visitor";

async function getCountryFromIP(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      console.error("IP API response not ok:", response.status);
      return "Unknown";
    }
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error("Error fetching country or parsing JSON:", error);
    return country;
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { type, page } = await req.json();

    // Get IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "127.0.0.1";

    if (type === "start") {
      // Start new visit
      const country = "Unknown"; // await getCountryFromIP(ip);
      await Visitor.updateOne(
        { ip },
        {
          $setOnInsert: { country },
          $push: { visits: { startTime: new Date(), pages: [page] } },
        },
        { upsert: true }
      );
    } else if (type === "end") {
      // End last visit
      await Visitor.updateOne(
        { ip },
        { $set: { "visits.$[last].endTime": new Date() } },
        {
          arrayFilters: [{ "last.endTime": { $exists: false } }],
        }
      );
    } else if (type === "page") {
      // Add page to current visit
      await Visitor.updateOne(
        { ip },
        { $addToSet: { "visits.$[last].pages": page } },
        {
          arrayFilters: [{ "last.endTime": { $exists: false } }],
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
