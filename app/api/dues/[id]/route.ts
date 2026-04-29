import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    // Get due diligence request (verify ownership)
    const dueRequest = await prisma.dueDiligenceRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        diligenceReport: true,
        findings: {
          orderBy: { riskLevel: "desc" },
        },
        documentUploads: true,
      },
    })

    if (!dueRequest) {
      return new Response(JSON.stringify({ error: "Due diligence request not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(dueRequest), {
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

export async function PUT(request: Request, { params }: { 
  params: { id: string } 
}) {
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

    // Verify ownership
    const dueRequest = await prisma.dueDiligenceRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!dueRequest) {
      return new Response(JSON.stringify({ error: "Due diligence request not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Update due diligence request
    const updated = await prisma.dueDiligenceRequest.update({
      where: { id: params.id },
      data: {
        title: body.title || dueRequest.title,
        description: body.description || dueRequest.description,
        status: body.status || dueRequest.status,
        priority: body.priority || dueRequest.priority,
        organizationName: body.organizationName || dueRequest.organizationName,
        kraPin: body.kraPin || dueRequest.kraPin,
        phase: body.phase !== undefined ? body.phase : dueRequest.phase,
      },
    })

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Update due diligence error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    // Verify ownership
    const dueRequest = await prisma.dueDiligenceRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!dueRequest) {
      return new Response(JSON.stringify({ error: "Due diligence request not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Delete due diligence request (cascades)
    await prisma.dueDiligenceRequest.delete({
      where: { id: params.id },
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Delete due diligence error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
