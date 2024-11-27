import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()
    const article = await prisma.article.create({
      data: {
        titleEn: json.titleEn,
        titlePt: json.titlePt,
        contentEn: json.contentEn,
        contentPt: json.contentPt,
      }
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Error creating article' }, 
      { status: 500 }
    )
  }
} 