import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

    // Get audit request (verify ownership)
    const auditRequest = await prisma.auditRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        auditReport: true,
        findings: {
          orderBy: { severity: "desc" },
        },
      },
    })

    if (!auditRequest) {
      return new Response(JSON.stringify({ error: "Audit not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(auditRequest), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Get audit error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    const auditRequest = await prisma.auditRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!auditRequest) {
      return new Response(JSON.stringify({ error: "Audit not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Update audit
    const updated = await prisma.auditRequest.update({
      where: { id: params.id },
      data: {
        title: body.title || auditRequest.title,
        description: body.description || auditRequest.description,
        status: body.status || auditRequest.status,
        priority: body.priority || auditRequest.priority,
      },
    })

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Update audit error:", error)
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
    const auditRequest = await prisma.auditRequest.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!auditRequest) {
      return new Response(JSON.stringify({ error: "Audit not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Delete audit (cascades to findings and report)
    await prisma.auditRequest.delete({
      where: { id: params.id },
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Delete audit error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
