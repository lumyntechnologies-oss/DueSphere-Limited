import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"
import { z } from "zod"

const auditRequestSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  contactName: z.string().min(1, "Contact name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(50).optional(),
  auditType: z.string().min(1, "Please select an audit type"),
  description: z.string().min(10, "Please provide at least 10 characters").max(5000),
})

function getAuditTypeLabel(type: string): string {
  const types: Record<string, string> = {
    security: "Security Audit",
    compliance: "Compliance Audit",
    performance: "Performance Audit",
    "code-quality": "Code Quality Audit",
    other: "Other / Not Sure",
  }
  return types[type] || type
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    [String.fromCharCode(38)]: String.fromCharCode(38) + "amp" + String.fromCharCode(59),
    [String.fromCharCode(60)]: String.fromCharCode(38) + "lt" + String.fromCharCode(59),
    [String.fromCharCode(62)]: String.fromCharCode(38) + "gt" + String.fromCharCode(59),
    [String.fromCharCode(34)]: String.fromCharCode(38) + "quot" + String.fromCharCode(59),
  }
  return text.replace(new RegExp("[" + String.fromCharCode(38, 60, 62, 34) + "]", "g"), (c) => map[c] || c)
}

interface EmailData {
  companyName: string
  contactName: string
  email: string
  phone?: string
  auditType: string
  description: string
  submittedAt: string
}

function emailTemplate(data: EmailData): string {
  const esc = escapeHtml
  const company = esc(data.companyName)
  const contact = esc(data.contactName)
  const email = esc(data.email)
  const phone = data.phone ? esc(data.phone) : "-"
  const type = esc(getAuditTypeLabel(data.auditType))
  const desc = esc(data.description).replace(/\n/g, String.fromCharCode(60) + "br" + String.fromCharCode(62))
  const date = esc(data.submittedAt)

  const lt = String.fromCharCode(60)
  const gt = String.fromCharCode(62)
  const aOpen = lt + 'a href="mailto:' + email + '"' + gt
  const aClose = lt + "/a" + gt

  const lines = [
    lt + '!DOCTYPE html' + gt,
    lt + 'html lang="en"' + gt,
    lt + 'head' + gt + lt + 'meta charset="UTF-8"' + gt + lt + 'meta name="viewport" content="width=device-width, initial-scale=1.0"' + gt,
    lt + 'title' + gt + 'New Audit Request' + lt + '/title' + gt,
    lt + 'style' + gt,
    'body{margin:0;padding:0;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;color:#1e293b;}',
    '.container{max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);}',
    '.header{background:linear-gradient(135deg,#059669,#0d9488);padding:40px 32px;text-align:center;}',
    '.header h1{margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;}',
    '.header p{margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;}',
    '.badge{display:inline-block;margin-top:16px;padding:6px 16px;background:rgba(255,255,255,0.2);color:#fff;border-radius:50px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}',
    '.body{padding:32px;}',
    '.field{margin-bottom:24px;}',
    '.field-label{font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;}',
    '.field-value{font-size:15px;color:#1e293b;line-height:1.5;}',
    '.field-value.description{background:#f8fafc;padding:16px;border-radius:8px;border-left:3px solid #059669;}',
    '.divider{height:1px;background:#e2e8f0;margin:24px 0;}',
    '.footer{padding:24px 32px;background:#f1f5f9;text-align:center;}',
    '.footer p{margin:0;font-size:12px;color:#64748b;}',
    '.footer a{color:#059669;text-decoration:none;font-weight:600;}',
    '.meta{display:flex;gap:24px;flex-wrap:wrap;}',
    '.meta-item{flex:1;min-width:140px;}',
    lt + '/style' + gt,
    lt + '/head' + gt,
    lt + 'body' + gt,
    lt + 'div class="container"' + gt,
    lt + 'div class="header"' + gt + lt + 'h1' + gt + 'New Audit Request' + lt + '/h1' + gt + lt + 'p' + gt + 'Submitted via DueSphere Contact Form' + lt + '/p' + gt + lt + 'span class="badge"' + gt + type + lt + '/span' + gt + lt + '/div' + gt,
    lt + 'div class="body"' + gt,
    lt + 'div class="meta"' + gt,
    lt + 'div class="meta-item"' + gt + lt + 'div class="field-label"' + gt + 'Company' + lt + '/div' + gt + lt + 'div class="field-value"' + gt + company + lt + '/div' + gt + lt + '/div' + gt,
    lt + 'div class="meta-item"' + gt + lt + 'div class="field-label"' + gt + 'Contact' + lt + '/div' + gt + lt + 'div class="field-value"' + gt + contact + lt + '/div' + gt + lt + '/div' + gt,
    lt + '/div' + gt,
    lt + 'div class="divider"' + gt + lt + '/div' + gt,
    lt + 'div class="meta"' + gt,
    lt + 'div class="meta-item"' + gt + lt + 'div class="field-label"' + gt + 'Email' + lt + '/div' + gt + lt + 'div class="field-value"' + gt + aOpen + email + aClose + lt + '/div' + gt + lt + '/div' + gt,
    lt + 'div class="meta-item"' + gt + lt + 'div class="field-label"' + gt + 'Phone' + lt + '/div' + gt + lt + 'div class="field-value"' + gt + phone + lt + '/div' + gt + lt + '/div' + gt,
    lt + '/div' + gt,
    lt + 'div class="divider"' + gt + lt + '/div' + gt,
    lt + 'div class="field"' + gt + lt + 'div class="field-label"' + gt + 'Audit Type' + lt + '/div' + gt + lt + 'div class="field-value"' + gt + type + lt + '/div' + gt + lt + '/div' + gt,
    lt + 'div class="field"' + gt + lt + 'div class="field-label"' + gt + 'Description' + lt + '/div' + gt + lt + 'div class="field-value description"' + gt + desc + lt + '/div' + gt + lt + '/div' + gt,
    lt + 'div class="divider"' + gt + lt + '/div' + gt,
    lt + 'div class="field"' + gt + lt + 'div class="field-label"' + gt + 'Submitted' + lt + '/div' + gt + lt + 'div class="field-value" style="font-size:13px;color:#64748b;"' + gt + date + lt + '/div' + gt + lt + '/div' + gt,
    lt + '/div' + gt,
    lt + 'div class="footer"' + gt,
    lt + 'p' + gt + lt + 'a href="https://duessphere.vercel.app"' + gt + 'DueSphere' + lt + '/a' + gt + ' - Professional Audit and Compliance Services' + lt + '/p' + gt,
    lt + 'p style="margin-top:4px"' + gt + 'This is an automated notification. Please respond to ' + email + '.' + lt + '/p' + gt,
    lt + '/div' + gt,
    lt + '/div' + gt,
    lt + '/body' + gt,
    lt + '/html' + gt,
  ]

  return lines.join("")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validationResult = auditRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues.map((i) => i.message),
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    const contact = await prisma.contact.create({
      data: {
        companyName: data.companyName.trim(),
        contactName: data.contactName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        auditType: data.auditType.trim(),
        description: data.description.trim(),
      },
    })

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

      const submittedAt = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })

      await transporter.sendMail({
        from: '"DueSphere Notifications" <' + process.env.SMTP_USER + '>',
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        replyTo: data.email,
        subject: 'New Audit Request: ' + getAuditTypeLabel(data.auditType) + ' - ' + data.companyName,
        html: emailTemplate({ ...data, submittedAt }),
      })
    } catch (emailError) {
      console.error("SMTP email error:", emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Audit request submitted successfully",
        id: contact.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to submit request. Please try again later." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Fetch contacts error:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
