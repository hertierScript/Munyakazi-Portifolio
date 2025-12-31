import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, purpose, message }) {
  try {
    const purposeLabels = {
      development: "Software Development",
      mentorship: "Forex Mentorship",
      both: "Both Services",
      other: "Other Inquiry",
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Purpose:</strong> ${purposeLabels[purpose] || purpose}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "hertiermunyakazi047@gmail.com", // Your email
      reply_to: email, // User's email for replies
      subject: `Portfolio Contact: ${purposeLabels[purpose] || "Inquiry"} from ${name}`,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: error.message };
  }
}
