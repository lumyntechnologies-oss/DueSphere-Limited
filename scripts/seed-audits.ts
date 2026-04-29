import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Seeding audits...")

  // Clear existing audit data
  await prisma.auditFinding.deleteMany({})
  await prisma.auditReport.deleteMany({})
  await prisma.auditRequest.deleteMany({})

  // Get a user to assign audits to (use first available user or create a demo user)
  let user = await prisma.user.findFirst()
  if (!user) {
    console.log("No users found. Creating a demo user...")
    user = await prisma.user.create({
      data: {
        clerkId: "demo_user_audit",
        email: "demo@duesphere.com",
        name: "Demo Client",
        role: "client",
        companyName: "TechCorp Inc",
        companySize: "50-100",
        subscriptionTier: "pro"
      }
    })
    console.log(`Created demo user: ${user.email}`)
  }

  // Create audit requests
  const auditRequests = [
    {
      userId: user.id,
      title: "Security Assessment for FinTech Platform",
      description: "Comprehensive security audit of the online payment processing system, including penetration testing, vulnerability scanning, and security architecture review.",
      serviceType: "security",
      status: "completed",
      priority: "high",
      requestedDate: new Date("2026-01-15"),
      startDate: new Date("2026-01-20"),
      completedDate: new Date("2026-02-05"),
      budget: 15000,
    },
    {
      userId: user.id,
      title: "GDPR Compliance Review",
      description: "Evaluate data handling practices and ensure compliance with GDPR regulations. Review consent mechanisms, data retention policies, and breach notification procedures.",
      serviceType: "compliance",
      status: "in-progress",
      priority: "high",
      requestedDate: new Date("2026-02-10"),
      startDate: new Date("2026-02-15"),
      budget: 12000,
    },
    {
      userId: user.id,
      title: "Code Quality and Technical Debt Analysis",
      description: "Assess codebase quality, identify technical debt, and provide recommendations for refactoring. Includes static code analysis and architecture review.",
      serviceType: "code-quality",
      status: "pending",
      priority: "medium",
      requestedDate: new Date("2026-03-01"),
      budget: 8500,
    },
    {
      userId: user.id,
      title: "System Performance Optimization Audit",
      description: "Analyze application performance metrics, identify bottlenecks, and recommend infrastructure improvements for better scalability.",
      serviceType: "performance",
      status: "pending",
      priority: "low",
      requestedDate: new Date("2026-03-10"),
      budget: 10000,
    },
    {
      userId: user.id,
      title: "API Security and Access Control Review",
      description: "Security audit focusing on API endpoints, authentication mechanisms, and access control policies.",
      serviceType: "security",
      status: "pending",
      priority: "high",
      requestedDate: new Date("2026-03-15"),
      budget: 18000,
    }
  ]

  const createdAudits = []
  for (const auditData of auditRequests) {
    const audit = await prisma.auditRequest.create({
      data: auditData
    })
    console.log(`Created audit: ${audit.title}`)
    createdAudits.push(audit)

    // Create associated audit findings for completed/in-progress audits
    if (audit.status === "completed" || audit.status === "in-progress") {
      const findings = [
        {
          auditRequestId: audit.id,
          title: "Insufficient input validation on user endpoints",
          description: "Several API endpoints lack proper input validation, potentially allowing injection attacks.",
          severity: "high",
          category: "security",
          recommendation: "Implement comprehensive input validation using a validation library such as Zod or Joi.",
          status: "open"
        },
        {
          auditRequestId: audit.id,
          title: "Missing audit logs for sensitive operations",
          description: "Critical operations like user role changes and data exports are not being logged.",
          severity: "medium",
          category: "compliance",
          recommendation: "Implement structured logging for all administrative actions with tamper-evident storage.",
          status: audit.status === "completed" ? "resolved" : "in-progress"
        },
        {
          auditRequestId: audit.id,
          title: "Outdated dependencies with known vulnerabilities",
          description: "Several npm packages have known security vulnerabilities that should be addressed.",
          severity: "medium",
          category: "code-quality",
          recommendation: "Update dependencies to latest secure versions and implement automated dependency scanning.",
          status: "open"
        },
        {
          auditRequestId: audit.id,
          title: "Inefficient database queries causing slow page loads",
          description: "N+1 query problem detected in dashboard components, leading to performance degradation.",
          severity: "low",
          category: "performance",
          recommendation: "Implement DataLoader pattern or use Prisma's include/select to optimize queries.",
          status: "open"
        }
      ]

      for (const finding of findings) {
        await prisma.auditFinding.create({
          data: finding
        })
      }
      console.log(`  Created ${findings.length} findings for: ${audit.title}`)

      // Create audit report for completed audits
      if (audit.status === "completed") {
        const report = await prisma.auditReport.create({
          data: {
            auditRequestId: audit.id,
            executiveSummary: `The ${audit.serviceType} audit identified several areas requiring attention. Overall, the system demonstrates good foundational practices but needs improvements in security hardening and compliance documentation. Immediate action recommended for high-severity findings.`,
            detailedReport: `## Audit Report: ${audit.title}\n\n### Findings Summary\n- High severity: 1 finding\n- Medium severity: 2 findings\n- Low severity: 1 finding\n\n### Recommendations\n1. Address input validation issues within 30 days\n2. Implement audit logging for all admin operations\n3. Update vulnerable dependencies in next sprint\n4. Optimize database queries to improve performance\n\n### Overall Assessment\nThe platform shows promise but requires focused effort to meet security and compliance standards for production deployment.`,
            overallScore: 72,
            riskLevel: "medium",
            recommendations: "Prioritize high-severity findings first. Establish a regular security review schedule. Implement automated testing for security vulnerabilities."
          }
        })
        console.log(`  Created audit report with score: ${report.overallScore}`)
      }
    }
  }

  console.log("Audits seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding audits:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
