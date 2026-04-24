import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    const [
      completedAudits,
      uniqueClients,
      resolvedFindings,
      totalAudits
    ] = await Promise.all([
      prisma.auditRequest.count({ where: { status: "completed" } }),
      prisma.user.count({ where: { role: "client" } }),
      prisma.auditFinding.count({ where: { status: "resolved" } }),
      prisma.auditRequest.count(),
    ])

    return NextResponse.json({
      auditsCompleted: completedAudits,
      clientsServed: uniqueClients,
      findingsResolved: resolvedFindings,
      totalAudits,
    })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
