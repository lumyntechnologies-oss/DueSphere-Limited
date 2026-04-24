import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error("Fetch services error:", error)
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }
    
    // Ensure arrays are properly formatted
    const features = Array.isArray(body.features) ? body.features : 
                    typeof body.features === 'string' ? [body.features] : []
    const deliverables = Array.isArray(body.deliverables) ? body.deliverables : 
                        typeof body.deliverables === 'string' ? [body.deliverables] : []
    
    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "",
        features,
        deliverables,
        isActive: body.isActive ?? true,
        order: body.order || 0,
      }
    })
    
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Create service error:", error)
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    // Ensure arrays are properly formatted
    const features = Array.isArray(body.features) ? body.features : 
                    typeof body.features === 'string' ? [body.features] : []
    const deliverables = Array.isArray(body.deliverables) ? body.deliverables : 
                        typeof body.deliverables === 'string' ? [body.deliverables] : []
    
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "",
        features,
        deliverables,
        isActive: body.isActive ?? true,
        order: body.order || 0,
      }
    })
    
    return NextResponse.json(service)
  } catch (error) {
    console.error("Update service error:", error)
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      )
    }
    
    await prisma.service.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete service error:", error)
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    )
  }
}