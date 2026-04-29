import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

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

    // Get due diligence requests for user
    const dues = await prisma.dueDiligenceRequest.findMany({
      where: { userId: user.id },
      include: { diligenceReport: true, findings: true, documentUploads: true },
      orderBy: { requestedDate: "desc" },
    })

    return new Response(JSON.stringify(dues), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Get due diligence error:", error)
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
    if (!body.title || !body.description || !body.diligenceType) {
      return new Response(JSON.stringify({ error: "Missing required fields: title, description, diligenceType" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Create due diligence request
    const dueDiligenceRequest = await prisma.dueDiligenceRequest.create({
      data: {
        userId: user.id,
        title: body.title,
        description: body.description,
        diligenceType: body.diligenceType,
        priority: body.priority || "medium",
        organizationName: body.organizationName,
        kraPin: body.kraPin,
        businessPermit: body.businessPermit,
        directorCount: body.directorCount,
        budget: body.budget,
        documents: body.documents || [],
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "due_diligence_created",
        title: "Due Diligence Request Created",
        message: `Your due diligence request "${dueDiligenceRequest.title}" has been created successfully.`,
        dueDiligenceRequestId: dueDiligenceRequest.id,
      },
    })

    return new Response(JSON.stringify(dueDiligenceRequest), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Create due diligence error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
