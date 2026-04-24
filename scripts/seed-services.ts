import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Seeding services...")

  // Clear existing services
  await prisma.service.deleteMany({})

  // Create default services
  const services = [
    {
      title: "Security Audits",
      description: "Identify vulnerabilities and strengthen your security posture with our comprehensive security assessments.",
      icon: "🔒",
      features: [
        "Infrastructure security and network architecture",
        "Application security and code vulnerabilities",
        "Access control and authentication mechanisms",
        "Data protection and encryption practices",
        "Threat landscape and exposure analysis",
        "Security policies and incident response procedures"
      ],
      deliverables: [
        "Vulnerability report",
        "Risk assessment matrix",
        "Prioritized remediation roadmap",
        "Executive summary"
      ],
      isActive: true,
      order: 1
    },
    {
      title: "Compliance Audits",
      description: "Ensure your organization meets regulatory requirements and industry standards with detailed compliance assessment.",
      icon: "✓",
      features: [
        "Regulatory requirements (SOC 2, HIPAA, GDPR, ISO 27001, etc.)",
        "Policies, controls, and procedures documentation",
        "Data handling and privacy practices",
        "Audit trails and logging requirements",
        "Employee training and awareness programs",
        "Documentation and evidence gathering"
      ],
      deliverables: [
        "Compliance gap analysis",
        "Control mapping",
        "Remediation plan",
        "Certification readiness assessment"
      ],
      isActive: true,
      order: 2
    },
    {
      title: "Performance Audits",
      description: "Optimize system efficiency and operational effectiveness through comprehensive performance analysis.",
      icon: "⚡",
      features: [
        "System performance metrics and benchmarks",
        "Resource utilization and capacity planning",
        "Scalability and bottleneck analysis",
        "Infrastructure optimization opportunities",
        "Cost efficiency and operational overhead",
        "Disaster recovery and business continuity"
      ],
      deliverables: [
        "Performance report",
        "Optimization recommendations",
        "Cost-benefit analysis",
        "Implementation timeline"
      ],
      isActive: true,
      order: 3
    },
    {
      title: "Code Quality Audits",
      description: "Evaluate code quality, maintainability, and adherence to best practices across your software projects.",
      icon: "📝",
      features: [
        "Code architecture and design patterns",
        "Security vulnerabilities in codebase",
        "Code maintainability and technical debt",
        "Testing coverage and quality assurance practices",
        "Performance and optimization opportunities",
        "Compliance with coding standards and best practices"
      ],
      deliverables: [
        "Code quality report",
        "Vulnerability findings",
        "Refactoring recommendations",
        "Metrics dashboard"
      ],
      isActive: true,
      order: 4
    }
  ]

  // Insert services
  for (const serviceData of services) {
    await prisma.service.create({
      data: serviceData
    })
    console.log(`Created service: ${serviceData.title}`)
  }

  console.log("Services seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding services:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })