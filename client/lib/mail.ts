import nodemailer from "nodemailer";

export async function sendContactEmail(submission: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "contact@pikonox.com";

  if (!host || !user || !pass) {
    console.warn("SMTP email notification credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not set in .env. Skipping email notification.");
    console.log("Submission details would have been emailed to:", receiver, submission);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${submission.firstName} ${submission.lastName}" <${user}>`,
      to: receiver,
      replyTo: submission.email,
      subject: `New Contact Submission: ${submission.service || "General Inquiry"}`,
      text: `
You have received a new contact submission from your website.

Details:
------------------------------------------
Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone || "Not provided"}
Subject/Service: ${submission.service || "General Inquiry"}
Date: ${new Date().toLocaleString()}
------------------------------------------

Message:
${submission.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1683F8; border-bottom: 2px solid #1683F8; padding-bottom: 10px; margin-bottom: 20px;">New Contact Submission</h2>
          <p>You have received a new contact submission from your website.</p>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 25px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${submission.firstName} ${submission.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${submission.email}" style="color: #1683F8; text-decoration: none;">${submission.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${submission.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subject/Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${submission.service || "General Inquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <div style="padding: 18px; border: 1px solid #e0e0e0; background-color: #f9f9f9; border-radius: 8px; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">
${submission.message}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully to", receiver);
  } catch (error: any) {
    console.error("Error sending contact email notification:", error.message);
  }
}
