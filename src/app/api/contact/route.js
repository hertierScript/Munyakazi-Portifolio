import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/resend";

export async function POST(req) {
  try {
    const { name, email, purpose, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendContactEmail({
      name,
      email,
      purpose,
      message,
    });

    if (!result.success) {
      console.error("Email sending failed:", result.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
