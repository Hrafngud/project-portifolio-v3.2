import { prisma } from './prisma'

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getArticles() {
  return await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
} 