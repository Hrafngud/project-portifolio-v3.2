'use server'

import { prisma } from '@/lib/prisma'

export async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createArticle(data: {
  titleEn: string
  titlePt: string
  contentEn: string
  contentPt: string
}) {
  return await prisma.article.create({
    data: {
      titleEn: data.titleEn,
      titlePt: data.titlePt,
      contentEn: data.contentEn,
      contentPt: data.contentPt
    }
  })
}

export async function getArticle(id: string) {
  const article = await prisma.article.findUnique({
    where: { id }
  })
  return article
} 