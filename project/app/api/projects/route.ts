import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()
    const project = await prisma.project.create({
      data: {
        titleEn: json.titleEn,
        titlePt: json.titlePt,
        descriptionEn: json.descriptionEn,
        descriptionPt: json.descriptionPt,
        imageUrl: json.imageUrl,
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Error creating project' }, 
      { status: 500 }
    )
  }
} 