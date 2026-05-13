import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "hello@binaryfroster.com",
    pass: process.env.GMAIL_APP_PASSWORD || "",
  },
});

// In-memory dedupe cache (resets on cold start)
const recentEmails = new Set<string>();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source = "footer" } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ error: "Email address is too long." }, { status: 400 });
    }

    const key = email.toLowerCase().trim();
    if (recentEmails.has(key)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    recentEmails.add(key);

    // Dev fallback
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.log(`\n📧 [Newsletter — Dev Mode] New subscriber: ${email} (source: ${source})\n`);
      return NextResponse.json({ ok: true, dev: true });
    }

    // Notify you of new subscriber
    await transporter.sendMail({
      from: `"Binary Froster" <${process.env.GMAIL_USER || "hello@binaryfroster.com"}>`,
      to: "hello@binaryfroster.com",
      subject: `📧 New Newsletter Subscriber — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#0D1117;color:#E5E7EB;border-radius:12px;border:1px solid #1F2937">
          <p style="font-size:16px;font-weight:700;color:#F9FAFB;margin:0 0 16px">New Newsletter Subscriber 🎉</p>
          <table style="width:100%">
            <tr><td style="color:#9CA3AF;padding:6px 0;width:80px">Email</td>
                <td style="color:#22D3EE"><a href="mailto:${escapeHtml(email)}" style="color:#22D3EE">${escapeHtml(email)}</a></td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0">Source</td>
                <td style="color:#F9FAFB">${escapeHtml(source)}</td></tr>
          </table>
        </div>
      `,
    });

    // Welcome email to subscriber
    await transporter.sendMail({
      from: `"Binary Froster" <${process.env.GMAIL_USER || "hello@binaryfroster.com"}>`,
      to: email,
      subject: "You're on the list 🎉 — Binary Froster Tech Tips",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0D1117;color:#E5E7EB;border-radius:12px;border:1px solid #1F2937">
          <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #1F2937">
            <span style="font-size:18px;font-weight:700;color:#F9FAFB">Welcome to the Binary Froster Newsletter 🚀</span>
          </div>
          <p style="color:#D1D5DB;line-height:1.6">You're now subscribed to our bi-weekly practical AI & automation tips, plus everything we learn building high-performance custom software.</p>
          <p style="color:#D1D5DB;line-height:1.6">Expect <strong style="color:#22D3EE">one email every two weeks</strong>. No spam, unsubscribe anytime.</p>
          <p style="color:#9CA3AF;font-size:13px;margin-top:24px">— The Binary Froster Team<br>
            <a href="https://www.binaryfroster.com" style="color:#22D3EE">binaryfroster.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[API /newsletter] Error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
