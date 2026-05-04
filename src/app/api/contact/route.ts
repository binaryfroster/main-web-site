import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting — simple in-memory store (resets on cold start)
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;       // max 3 submissions
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    // ── Rate limit ────────────────────────────────────────────────────
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // ── Parse & validate ──────────────────────────────────────────────
    const body = await req.json();
    const { name, email, company, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    // ── Check API key ─────────────────────────────────────────────────
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_REPLACE")) {
      // Dev fallback — log to console when no key is configured
      console.log("\n📬 [Contact Form — Dev Mode]");
      console.log(`From: ${name} <${email}>`);
      if (company) console.log(`Company: ${company}`);
      if (service) console.log(`Service: ${service}`);
      if (budget)  console.log(`Budget: ${budget}`);
      console.log(`Message:\n${message}\n`);
      return NextResponse.json({ ok: true, dev: true });
    }

    // ── Send notification to Binary Froster ───────────────────────────
    await resend.emails.send({
      from: "Binary Froster Contact <contact@binaryfroster.com>",
      to: "binaryfroster@gmail.com",
      replyTo: email,
      subject: `New Inquiry${company ? ` from ${company}` : ""} — ${service || "General"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0D1117;color:#E5E7EB;border-radius:12px;border:1px solid #1F2937">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #1F2937">
            <div style="width:10px;height:10px;border-radius:50%;background:#22D3EE;flex-shrink:0"></div>
            <span style="font-size:18px;font-weight:700;color:#F9FAFB">New Project Inquiry</span>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px 0;color:#9CA3AF;width:120px">Name</td>
                <td style="padding:8px 0;color:#F9FAFB;font-weight:600">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF">Email</td>
                <td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#22D3EE">${escapeHtml(email)}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#9CA3AF">Company</td>
                <td style="padding:8px 0;color:#F9FAFB">${escapeHtml(company)}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:8px 0;color:#9CA3AF">Service</td>
                <td style="padding:8px 0;color:#F9FAFB">${escapeHtml(service)}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:8px 0;color:#9CA3AF">Budget</td>
                <td style="padding:8px 0;color:#F9FAFB">${escapeHtml(budget)}</td></tr>` : ""}
          </table>

          <div style="background:#161B22;border-radius:8px;padding:16px;border:1px solid #1F2937">
            <p style="margin:0 0 8px;color:#9CA3AF;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">Message</p>
            <p style="margin:0;color:#F9FAFB;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>

          <p style="margin:20px 0 0;font-size:12px;color:#6B7280;text-align:center">
            Sent via Binary Froster contact form · Reply directly to this email to respond to ${escapeHtml(name)}
          </p>
        </div>
      `,
    });

    // ── Auto-reply to the sender ──────────────────────────────────────
    await resend.emails.send({
      from: "Binary Froster <contact@binaryfroster.com>",
      to: email,
      subject: "We received your message — Binary Froster",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0D1117;color:#E5E7EB;border-radius:12px;border:1px solid #1F2937">
          <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #1F2937">
            <span style="font-size:18px;font-weight:700;color:#F9FAFB">Hi ${escapeHtml(name.split(" ")[0])} 👋</span>
          </div>
          <p style="color:#D1D5DB;line-height:1.6">Thanks for reaching out to Binary Froster! We've received your message and will get back to you within <strong style="color:#22D3EE">24 hours</strong>.</p>
          <p style="color:#D1D5DB;line-height:1.6">In the meantime, feel free to check out our latest work at <a href="https://www.binaryfroster.com/portfolio" style="color:#22D3EE">binaryfroster.com/portfolio</a>.</p>
          <p style="color:#9CA3AF;font-size:13px;margin-top:24px">— The Binary Froster Team</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[API /contact] Error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email us directly at binaryfroster@gmail.com" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
