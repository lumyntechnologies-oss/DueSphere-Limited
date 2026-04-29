import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Seeding blogs...")

  // Clear existing blogs
  await prisma.blog.deleteMany({})

  // Create sample blog posts
  const blogs = [
    {
      title: "The Importance of Regular Security Audits",
      excerpt: "Discover why routine security assessments are critical for protecting your organization's digital assets and maintaining compliance.",
      content: `In today's rapidly evolving threat landscape, security audits are not just a checkbox exercise—they're a fundamental necessity for organizations of all sizes. Regular security audits help identify vulnerabilities before they can be exploited, ensure compliance with industry regulations, and build customer trust.

A comprehensive security audit evaluates your infrastructure, applications, policies, and procedures against established frameworks like NIST, ISO 27001, and CIS Controls. The findings provide actionable insights that enable your team to prioritize and remediate risks effectively.

Key benefits of regular security audits include:
- Proactive identification of security gaps
- Compliance with GDPR, HIPAA, SOC 2, and other regulations
- Reduced risk of data breaches and financial losses
- Enhanced stakeholder confidence and business continuity

At DueSphere, our security audit methodology combines automated scanning with expert manual testing to deliver comprehensive coverage and reliable results.`,
      category: "Security",
      image: "",
      author: "Dr. Sarah Mwangi",
      publishedAt: new Date("2026-03-15"),
    },
    {
      title: "Understanding SOC 2 Compliance: A Complete Guide",
      excerpt: "Navigate the complexities of SOC 2 compliance with our comprehensive guide covering all five trust service criteria.",
      content: `SOC 2 (Service Organization Control 2) is a widely recognized auditing standard for service providers that store customer data in the cloud. Developed by the AICPA, SOC 2 ensures that systems are secure, available, processing integrity is maintained, and confidentiality and privacy are protected.

The framework is built around five Trust Service Criteria:
1. Security - Protection against unauthorized access
2. Availability - Systems are operational as agreed
3. Processing Integrity - System processing is complete and accurate
4. Confidentiality - Sensitive information is protected
5. Privacy - Personal information is handled appropriately

Achieving SOC 2 compliance requires implementing comprehensive controls across people, processes, and technology. The audit process typically includes documentation review, system testing, and evidence compilation.

Our team at DueSphere guides organizations through the entire SOC 2 journey, from gap analysis to audit readiness, ensuring a smooth and successful certification process.`,
      category: "Compliance",
      image: "",
      author: "James Ochieng",
      publishedAt: new Date("2026-03-08"),
    },
    {
      title: "Performance Audits: Optimizing System Efficiency",
      excerpt: "Learn how performance audits can uncover bottlenecks and help you deliver faster, more reliable services to your users.",
      content: `In an era where user experience directly impacts business success, system performance is non-negotiable. Performance audits provide a structured approach to evaluating and optimizing your technology stack for speed, reliability, and scalability.

A thorough performance audit examines:
- Application response times and throughput
- Database query efficiency and indexing
- Network latency and bandwidth utilization
- Infrastructure resource allocation
- Caching strategies and CDN effectiveness
- Code-level optimizations and technical debt

The findings from a performance audit empower your engineering team to make data-driven decisions about infrastructure investments, code refactoring, and architectural improvements. Organizations that prioritize performance see higher user engagement, improved conversion rates, and reduced infrastructure costs.

DueSphere's performance audit methodology combines synthetic monitoring, real user metrics analysis, and load testing to provide a complete picture of your system's performance characteristics.`,
      category: "Performance",
      image: "",
      author: "Eng. Wanjiku Karanja",
      publishedAt: new Date("2026-02-28"),
    },
    {
      title: "Code Quality Audits: Reducing Technical Debt",
      excerpt: "Technical debt accumulates silently but can cripple development velocity. Here's how code quality audits help you manage it.",
      content: `Technical debt is the hidden cost of taking shortcuts during development. While sometimes necessary to meet deadlines, unchecked technical debt leads to slower feature development, increased bug rates, and higher maintenance costs.

A code quality audit provides an objective assessment of your codebase across multiple dimensions:
- Code complexity and maintainability metrics (Cyclomatic complexity, etc.)
- Adherence to coding standards and best practices
- Test coverage and quality assurance effectiveness
- Security vulnerabilities and anti-patterns
- Architecture consistency and modularity
- Documentation completeness and accuracy

The output is a prioritized roadmap of refactoring opportunities, architectural improvements, and process enhancements that will pay dividends in developer productivity and system reliability.

At DueSphere, we use industry-standard tools (SonarQube, ESLint, security scanners) combined with expert human review to deliver actionable insights that your team can immediately act upon.`,
      category: "Code Quality",
      image: "",
      author: "Michael Njoroge",
      publishedAt: new Date("2026-02-20"),
    },
    {
      title: "GDPR Readiness: Preparing for Data Protection Audits",
      excerpt: "With data protection regulations tightening globally, GDPR compliance is more critical than ever. Here's how to prepare.",
      content: `The General Data Protection Regulation (GDPR) has fundamentally changed how organizations handle personal data. Non-compliance can result in fines of up to 4% of global annual revenue or €20 million, whichever is higher.

A GDPR-focused audit evaluates your data processing activities against the regulation's core principles:

**Lawfulness, Fairness, and Transparency**
- Review data collection mechanisms
- Verify lawful basis for processing (consent, contract, legitimate interest)
- Ensure clear privacy notices

**Data Subject Rights**
- Processes for access, rectification, erasure, and portability
- Mechanisms to handle requests within 30 days
- Identity verification procedures

**Security and Breach Notification**
- Technical and organizational measures for data security
- Incident response plan with 72-hour breach notification capability
- Regular security testing and vulnerability management

**Vendor Management**
- Data processing agreements (DPAs) with all processors
- Due diligence on third-party services
- Sub-processor notification requirements

Our GDPR readiness assessments provide a gap analysis against these requirements, followed by a remediation plan that prioritizes high-risk areas. We help you build a privacy program that stands up to regulatory scrutiny.`,
      category: "Compliance",
      image: "",
      author: "Grace Wambui",
      publishedAt: new Date("2026-02-10"),
    },
    {
      title: "The ROI of Due Diligence: Beyond Risk Mitigation",
      excerpt: "Due diligence is often viewed as a cost center, but its true value extends far beyond risk avoidance. Discover the real ROI.",
      content: `While due diligence is traditionally framed as a risk mitigation exercise, forward-thinking organizations recognize it as a strategic investment that delivers measurable returns across multiple dimensions.

**Direct Financial Benefits:**
- Avoidance of costly litigation and regulatory penalties
- Prevention of acquisitions with hidden liabilities
- Reduced insurance premiums through verified risk profiles
- Negotiation leverage with verified facts

**Strategic Advantages:**
- Faster deal closures with confident decision-making
- Enhanced reputation through demonstrated diligence
- Better integration planning with thorough understanding of target
- Improved stakeholder confidence (investors, board, customers)

**Operational Efficiency:**
- Streamlined vendor onboarding with pre-vetted partners
- Reduced time spent on investigating concerns post-engagement
- Clear framework for ongoing monitoring relationships

Quantifying the ROI of due diligence involves tracking metrics such as:
- Value of avoided losses
- Time saved in investigation
- Deal success rates
- Post-engagement issue frequency

At DueSphere, we design due diligence programs that balance thoroughness with efficiency, delivering actionable intelligence without unnecessary overhead. Our reports are structured to support confident decision-making and provide lasting value beyond the initial engagement.`,
      category: "Due Diligence",
      image: "",
      author: "David Mutua",
      publishedAt: new Date("2026-02-01"),
    }
  ]

  // Insert blogs
  for (const blogData of blogs) {
    await prisma.blog.create({
      data: blogData
    })
    console.log(`Created blog: ${blogData.title}`)
  }

  console.log("Blogs seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding blogs:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
