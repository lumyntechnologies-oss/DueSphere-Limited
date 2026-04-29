import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Seeding due diligence requests...")

  // Clear existing due diligence data
  await prisma.dueDiligenceDocument.deleteMany({})
  await prisma.dueDiligenceFinding.deleteMany({})
  await prisma.dueDiligenceReport.deleteMany({})
  await prisma.dueDiligenceRequest.deleteMany({})

  // Get a user to assign due diligence to (use first available user or create a demo user)
  let user = await prisma.user.findFirst()
  if (!user) {
    console.log("No users found. Creating a demo user...")
    user = await prisma.user.create({
      data: {
        clerkId: "demo_user_due",
        email: "demo@duesphere.com",
        name: "Demo Client",
        role: "client",
        companyName: "TechCorp Inc",
        companySize: "50-100",
        subscriptionTier: "enterprise"
      }
    })
    console.log(`Created demo user: ${user.email}`)
  }

  // Create due diligence requests
  const dueDiligenceRequests = [
    {
      userId: user.id,
      title: "Organization Due Diligence - Merger Target",
      description: "Comprehensive due diligence for potential merger with Alpha Dynamics Ltd. Includes legal, financial, and operational review.",
      diligenceType: "organization",
      status: "completed",
      priority: "high",
      organizationName: "Alpha Dynamics Ltd",
      kraPin: "P051234567A",
      businessPermit: "BP-2025-78945",
      cr12IssueDate: new Date("2025-06-15"),
      directorCount: 5,
      budget: 25000,
      phase: 5,
      requestedDate: new Date("2026-01-10"),
      startDate: new Date("2026-01-15"),
      completedDate: new Date("2026-02-28"),
      documents: [
        { type: "KRA_PIN", name: "KRA_PIN_Certificate.pdf", url: "/uploads/kra_pin.pdf" },
        { type: "Business_Permit", name: "Business_Permit.pdf", url: "/uploads/business_permit.pdf" },
        { type: "CR12", name: "CR12_Certificate.pdf", url: "/uploads/cr12.pdf" },
        { type: "ID_Passport", name: "Director_IDs.pdf", url: "/uploads/director_ids.pdf" }
      ],
      riskRating: "low"
    },
    {
      userId: user.id,
      title: "New Director Background Check",
      description: "Pre-employment due diligence for prospective board member. Includes sanctions screening, reputation check, and conflict of interest analysis.",
      diligenceType: "new-hire",
      status: "in-progress",
      priority: "high",
      organizationName: "Beta Innovations LLC",
      kraPin: "P098765432B",
      businessPermit: "BP-2025-12378",
      cr12IssueDate: new Date("2024-11-20"),
      directorCount: 3,
      budget: 8000,
      phase: 3,
      requestedDate: new Date("2026-02-20"),
      startDate: new Date("2026-02-25"),
      documents: [
        { type: "KRA_PIN", name: "KRA_PIN.pdf", url: "/uploads/beta_kra.pdf" },
        { type: "ID_Passport", name: "Passport_Scan.pdf", url: "/uploads/director_passport.pdf" }
      ],
    },
    {
      userId: user.id,
      title: "Vendor Organization Assessment",
      description: "Due diligence review of third-party vendor for cloud infrastructure services. Focus on data protection and business continuity.",
      diligenceType: "organization",
      status: "pending",
      priority: "medium",
      organizationName: "CloudServe Technologies",
      kraPin: "P456789123C",
      businessPermit: "BP-2025-56789",
      cr12IssueDate: new Date("2025-09-10"),
      directorCount: 4,
      budget: 15000,
      phase: 1,
      requestedDate: new Date("2026-03-05"),
      documents: [],
    },
    {
      userId: user.id,
      title: "Strategic Partner Background Check",
      description: "Due diligence for potential strategic partnership with Gamma Holdings. Assessment of corporate structure and regulatory compliance.",
      diligenceType: "organization",
      status: "pending",
      priority: "medium",
      organizationName: "Gamma Holdings",
      kraPin: "P789123456D",
      businessPermit: "BP-2024-34567",
      cr12IssueDate: new Date("2024-05-22"),
      directorCount: 7,
      budget: 20000,
      phase: 1,
      requestedDate: new Date("2026-03-12"),
      documents: [],
    },
    {
      userId: user.id,
      title: "Key Personnel Clearance - CTO Position",
      description: "Due diligence for executive-level hire. Includes sanctions screening, education verification, and reference checks.",
      diligenceType: "new-hire",
      status: "pending",
      priority: "high",
      organizationName: "Delta Tech Solutions",
      kraPin: "P321654987E",
      businessPermit: "BP-2025-90123",
      cr12IssueDate: new Date("2025-08-30"),
      directorCount: 2,
      budget: 12000,
      phase: 1,
      requestedDate: new Date("2026-03-18"),
      documents: [],
    }
  ]

  const createdRequests = []
  for (const requestData of dueDiligenceRequests) {
    const request = await prisma.dueDiligenceRequest.create({
      data: requestData
    })
    console.log(`Created due diligence request: ${request.title}`)
    createdRequests.push(request)

    // Create findings for completed/in-progress requests
    if (request.status === "completed" || request.status === "in-progress") {
      const findings = [
        {
          dueDiligenceRequestId: request.id,
          title: "Beneficial ownership structure verified",
          description: "All ultimate beneficial owners (UBOs) have been identified and verified through registry searches.",
          riskLevel: "low",
          category: "governance",
          evidence: "Registry extracts obtained and verified",
          recommendation: "Maintain updated ownership records annually.",
          status: "mitigated"
        },
        {
          dueDiligenceRequestId: request.id,
          title: "No sanctions or watchlist hits identified",
          description: "Sanctions screening conducted across major databases (OFAC, UN, EU) returned no matches.",
          riskLevel: "low",
          category: "sanctions",
          evidence: "Screening reports attached",
          recommendation: "Implement periodic re-screening every 6 months.",
          status: "mitigated"
        },
        {
          dueDiligenceRequestId: request.id,
          title: "Minor regulatory filing delays noted",
          description: "Annual returns filed 2-3 weeks past due date in 2023 and 2024.",
          riskLevel: "medium",
          category: "legal",
          evidence: "Registry filing history reviewed",
          recommendation: "Confirm all outstanding filings are brought up to date. Implement calendar reminders for compliance deadlines.",
          status: request.status === "completed" ? "accepted" : "open"
        },
        {
          dueDiligenceRequestId: request.id,
          title: "Positive media coverage and reputation",
          description: "Media search reveals no negative press. Company maintains positive industry standing.",
          riskLevel: "low",
          category: "reputation",
          evidence: "Media monitoring report compiled",
          recommendation: "Continue periodic reputation monitoring.",
          status: "mitigated"
        },
        {
          dueDiligenceRequestId: request.id,
          title: "Financial statements show stable growth",
          description: "Review of audited financials indicates consistent revenue growth and manageable debt levels.",
          riskLevel: "low",
          category: "financial",
          evidence: "Financial statements reviewed",
          recommendation: "No concerns identified at this time.",
          status: "mitigated"
        }
      ]

      for (const finding of findings) {
        await prisma.dueDiligenceFinding.create({
          data: finding
        })
      }
      console.log(`  Created ${findings.length} findings for: ${request.title}`)

      // Create report for completed requests
      if (request.status === "completed") {
        const report = await prisma.dueDiligenceReport.create({
          data: {
            dueDiligenceRequestId: request.id,
            executiveSummary: `The due diligence review of ${request.organizationName} has been completed successfully. The organization demonstrates strong governance practices with minor compliance gaps that have been acknowledged and accepted. No significant legal, financial, or reputational risks were identified that would preclude engagement. Overall risk rating: Low.`,
            legalCompliance: `Legal compliance assessment revealed minor filing delays in 2023-2024 but no serious violations. All necessary business permits are current. Corporate structure is clear and properly registered.`,
            governance: `Governance structure is appropriate for organization size. Board composition meets statutory requirements. Ownership records are maintained and verified.`,
            sanctionsScreening: `Sanctions screening conducted across OFAC, UN, and EU databases returned no hits. No PEP (Politically Exposed Person) associations identified.`,
            reputationalRisk: `Reputation assessment positive. No negative media coverage detected. Industry references checked with favorable outcomes.`,
            recommendations: [
              "Ensure all annual returns are filed promptly going forward",
              "Implement semi-annual sanctions re-screening",
              "Maintain current corporate records and shareholder registers",
              "Continue periodic financial statement reviews"
            ],
            riskRating: "low"
          }
        })
        console.log(`  Created due diligence report with risk rating: ${report.riskRating}`)
      }
    }

    // Create document uploads for completed/in-progress requests
    if (request.documents && request.documents.length > 0) {
      for (const doc of request.documents) {
        await prisma.dueDiligenceDocument.create({
          data: {
            dueDiligenceRequestId: request.id,
            filename: doc.name,
            documentType: doc.type,
            fileUrl: doc.url,
            verified: true,
            notes: `Verified ${doc.type.replace('_', ' ')} document`
          }
        })
      }
      console.log(`  Created ${request.documents.length} document records for: ${request.title}`)
    }
  }

  console.log("Due diligence seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding due diligence:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
