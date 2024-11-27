import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Articles } from "@/components/articles";
import { Navbar } from "@/components/navbar";
import { prisma } from '@/lib/prisma'

export const revalidate = 60;

export default async function Home() {
  try {
    const [projects, articles] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.article.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return (
      <div className="space-y-2 pt-6 max-w-7xl mx-auto">
        <Navbar />
        <Hero />
        <Suspense fallback={<div>Loading projects...</div>}>
          <Projects projects={projects} />
        </Suspense>
        <Suspense fallback={<div>Loading articles...</div>}>
          <Articles articles={articles} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading content</div>;
  }
}