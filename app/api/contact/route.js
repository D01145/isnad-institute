import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PROGRAMS = new Set([
  "Arabic Course",
  "Quran Classes",
  "Both",
  "General question",
]);
const ALLOWED_CLASS_FORMATS = new Set([
  "Private 1-to-1",
  "Small group",
  "Not sure yet",
]);

function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanLine(value, maxLength = 500) {
  return cleanText(value, maxLength).replace(/[\u0000-\u001F\u007F]+/g, " ");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell({ preheader, title, children }) {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f4f6f2;font-family:Arial,Helvetica,sans-serif;color:#17231f">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f2;padding:32px 16px">
          <tr><td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid #e8ece8;border-radius:24px;overflow:hidden">
              <tr><td style="background:#0f6b4f;padding:28px 34px;color:#ffffff">
                <div style="font-size:12px;font-weight:700;letter-spacing:2px;opacity:.75">ISNAD INSTITUTE</div>
                <h1 style="margin:12px 0 0;font-size:26px;line-height:1.25">${title}</h1>
              </td></tr>
              <tr><td style="padding:32px 34px;font-size:16px;line-height:1.7">${children}</td></tr>
              <tr><td style="padding:20px 34px;border-top:1px solid #eef1ee;color:#78827e;font-size:12px">Learn Arabic. Understand the Quran.</td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>
  `;
}

function detailRow(label, value) {
  return `<tr>
    <td style="padding:9px 0;color:#69736f;vertical-align:top;width:150px">${label}</td>
    <td style="padding:9px 0;font-weight:700;vertical-align:top">${value || "Not provided"}</td>
  </tr>`;
}

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact API configuration error: RESEND_API_KEY is missing.");
      return Response.json(
        { success: false, error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const data = await request.json();

    // A hidden field catches basic form bots without inconveniencing learners.
    if (cleanLine(data.website, 100)) {
      return Response.json({ success: true });
    }

    const inquiryType = data.inquiryType === "contact" ? "contact" : "trial";
    const name = cleanLine(data.name, 100);
    const email = cleanLine(data.email, 254).toLowerCase();
    const program = ALLOWED_PROGRAMS.has(data.program)
      ? data.program
      : "Not specified";
    const classFormat = ALLOWED_CLASS_FORMATS.has(data.classFormat)
      ? data.classFormat
      : "Not specified";
    const country = cleanLine(data.country, 80);
    const whatsapp = cleanLine(data.whatsapp, 40);
    const availability = cleanLine(data.availability, 300);
    const timezone = cleanLine(data.timezone, 100);
    const message = cleanText(data.message || data.goals, 2000);

    if (name.length < 2) {
      return Response.json(
        { success: false, error: "Please enter the learner's full name." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (inquiryType === "contact" && message.length < 10) {
      return Response.json(
        { success: false, error: "Please enter a message of at least 10 characters." },
        { status: 400 }
      );
    }

    const safe = Object.fromEntries(
      Object.entries({
        name,
        email,
        program,
        classFormat,
        country,
        whatsapp,
        availability,
        timezone,
        message,
      }).map(([key, value]) => [key, escapeHtml(value)])
    );

    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmail = process.env.CONTACT_EMAIL || "hello@isnadinstitute.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "hello@isnadinstitute.com";
    const isTrial = inquiryType === "trial";
    const subject = isTrial
      ? `New free trial request — ${name}`
      : `New website enquiry — ${name}`;

    const rows = [
      detailRow("Name", safe.name),
      detailRow("Email", `<a href="mailto:${safe.email}" style="color:#0f6b4f">${safe.email}</a>`),
      detailRow("Program", safe.program),
      isTrial ? detailRow("Class preference", safe.classFormat) : "",
      isTrial ? detailRow("Country", safe.country) : "",
      isTrial ? detailRow("WhatsApp", safe.whatsapp) : "",
      isTrial ? detailRow("Availability", safe.availability) : "",
      isTrial ? detailRow("Time zone", safe.timezone) : "",
    ].join("");

    const teamEmail = await resend.emails.send({
      from: `Isnad Institute Website <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject,
      html: emailShell({
        preheader: subject,
        title: isTrial ? "New free trial request" : "New website enquiry",
        children: `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          <div style="margin-top:22px;padding:18px;background:#f7f9f7;border-radius:14px">
            <div style="margin-bottom:6px;color:#69736f;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px">${isTrial ? "Learning goals" : "Message"}</div>
            <div style="white-space:pre-wrap">${safe.message || "Not provided"}</div>
          </div>
          <p style="margin:24px 0 0"><a href="mailto:${safe.email}" style="display:inline-block;background:#0f6b4f;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px">Reply to ${safe.name}</a></p>
        `,
      }),
      text: `${subject}\n\nName: ${name}\nEmail: ${email}\nProgram: ${program}\n${isTrial ? `Class preference: ${classFormat}\nCountry: ${country || "Not provided"}\nWhatsApp: ${whatsapp || "Not provided"}\nAvailability: ${availability || "Not provided"}\nTime zone: ${timezone || "Not provided"}\n` : ""}\n${isTrial ? "Learning goals" : "Message"}: ${message || "Not provided"}`,
    });

    if (teamEmail.error) {
      console.error("Resend team notification error:", teamEmail.error);
      return Response.json(
        { success: false, error: "We could not send your request. Please try again." },
        { status: 502 }
      );
    }

    const confirmation = await resend.emails.send({
      from: `Isnad Institute <${fromEmail}>`,
      to: [email],
      subject: isTrial
        ? "We received your free trial request | Isnad Institute"
        : "We received your message | Isnad Institute",
      html: emailShell({
        preheader: "Your message has reached the Isnad Institute team.",
        title: isTrial ? "Your trial request is received" : "Thank you for getting in touch",
        children: `
          <p style="margin:0 0 16px">Assalamu Alaikum ${safe.name},</p>
          <p style="margin:0 0 16px">Thank you for ${isTrial ? "requesting a free trial with" : "contacting"} <strong>Isnad Institute</strong>.</p>
          <p style="margin:0 0 16px">We have received your ${isTrial ? "request" : "message"}. A member of our team will reply within 24 hours, in sha Allah.</p>
          ${isTrial ? `<div style="margin:22px 0;padding:18px;background:#f7f9f7;border-radius:14px"><strong>Your request</strong><br>${safe.program} · ${safe.classFormat}</div>` : ""}
          <p style="margin:24px 0 0">JazakAllahu Khair,<br><strong>Isnad Institute</strong></p>
        `,
      }),
      text: `Assalamu Alaikum ${name},\n\nThank you for ${isTrial ? "requesting a free trial with" : "contacting"} Isnad Institute. We have received your ${isTrial ? "request" : "message"}, and a member of our team will reply within 24 hours, in sha Allah.\n\nJazakAllahu Khair,\nIsnad Institute`,
    });

    if (confirmation.error) {
      // The team already has the enquiry, so do not encourage a duplicate submission.
      console.error("Resend confirmation error:", confirmation.error);
    }

    return Response.json({
      success: true,
      confirmationSent: !confirmation.error,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
