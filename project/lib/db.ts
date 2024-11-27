import { prisma } from './prisma'
import type { Article, Project } from '@/types'

export async function createArticle(data: Omit<Article, 'id' | 'createdAt'>) {
  return await prisma.article.create({
    data: {
      titleEn: data.titleEn,
      titlePt: data.titlePt,
      contentEn: data.contentEn,
      contentPt: data.contentPt,
    }
  })
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt'>) {
  return await prisma.project.create({
    data: {
      titleEn: data.titleEn,
      titlePt: data.titlePt,
      descriptionEn: data.descriptionEn,
      descriptionPt: data.descriptionPt,
      imageUrl: data.imageUrl,
    }
  }) 
} 