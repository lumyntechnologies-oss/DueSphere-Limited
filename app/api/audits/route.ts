import { auth, currentUser } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Get audit requests for user
    const audits = await prisma.auditRequest.findMany({
      where: { userId: user.id },
      include: { auditReport: true, findings: true },
      orderBy: { requestedDate: "desc" },
    })

    return new Response(JSON.stringify(audits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Get audits error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    const body = await request.json()

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Validate input
    if (!body.title || !body.description || !body.serviceType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Create audit request
    const auditRequest = await prisma.auditRequest.create({
      data: {
        userId: user.id,
        title: body.title,
        description: body.description,
        serviceType: body.serviceType,
        priority: body.priority || "medium",
        budget: body.budget,
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "audit_created",
        title: "Audit Request Created",
        message: `Your audit request "${auditRequest.title}" has been created successfully.`,
        auditRequestId: auditRequest.id,
      },
    })

    return new Response(JSON.stringify(auditRequest), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Create audit error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
