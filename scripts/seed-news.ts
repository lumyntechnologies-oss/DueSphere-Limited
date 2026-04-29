import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Seeding blog posts...")

  // Clear existing news
  await prisma.news.deleteMany({})

  // Create sample news articles
  const newsArticles = [
    {
      title: "DueSphere Launches Comprehensive Due Diligence Platform",
      excerpt: "We're excited to announce the launch of our new due diligence service, offering organization and personnel background checks for enterprises.",
      content: `DueSphere is proud to announce the launch of our comprehensive Due Diligence services, designed to help organizations make informed decisions about mergers, acquisitions, new hires, and vendor partnerships.

Our new offering covers three core areas:
- **Organization Due Diligence** — Verify corporate standing, ownership, and legal compliance
- **New Hire Background Checks** — Screen executives and key personnel before onboarding
- **Vendor & Third-Party DD** — Assess extended enterprise risk

Backed by our existing audit infrastructure, our due diligence service combines automated screening with expert human review to deliver reliable, actionable reports.

**Available now:** Organizations can request due diligence investigations through our client dashboard or by contacting our team directly.`,
      category: "Announcements",
      image: "",
      author: "DueSphere Team",
      publishedAt: new Date("2026-03-10"),
    },
    {
      title: "New Feature: Real-Time Audit Status Notifications",
      excerpt: "Clients can now receive instant notifications when their audit status changes, improving transparency and collaboration.",
      content: `We've enhanced the DueSphere client experience with real-time notifications for audit request updates.

**What's new:**
- Instant email and in-app notifications when audit status changes (pending → in-progress → completed)
- Detailed notifications with links to view updated reports
- Customizable notification preferences for each user

Clients will now be alerted the moment:
- An auditor starts work on their request
- A draft report is ready for review
- A final report is published
- A finding is updated or resolved

This improvement reduces communication lag and keeps stakeholders informed throughout the audit lifecycle.

**How to enable:** Log into your dashboard and navigate to Settings → Notifications to configure your preferences.`,
      category: "Product Updates",
      image: "",
      author: "Product Team",
      publishedAt: new Date("2026-03-05"),
    },
    {
      title: "ISO 27001 Certification Achieved",
      excerpt: "DueSphere is now officially ISO 27001 certified, validating our information security management practices.",
      content: `We're thrilled to announce that DueSphere has achieved ISO/IEC 27001:2022 certification, the internationally recognized standard for information security management.

**What this means for our clients:**
- Our systems and processes meet rigorous security standards
- Your data is protected by proven controls and procedures
- Regular external audits ensure ongoing compliance
- Enhanced trust in our ability to handle sensitive audit information

The certification reflects our commitment to security best practices across:
- Access control and identity management
- Cryptography and data protection
- Incident management and business continuity
- Supplier relationships and supply chain security
- Information security policies and risk assessment

This milestone reinforces our position as a trusted partner for organizations seeking secure, reliable audit and due diligence services.`,
      category: "Company News",
      image: "",
      author: "Operations Team",
      publishedAt: new Date("2026-02-25"),
    }
  ]

  // Insert news articles
  for (const newsData of newsArticles) {
    await prisma.news.create({
      data: newsData
    })
    console.log(`Created news: ${newsData.title}`)
  }

  console.log("News seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding news:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
