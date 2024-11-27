'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { Project } from "./types";

export function Projects({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  const t = dictionary[language].projects;

  if (!projects?.length) {
    return (
      <section id="projects" className="py-10">
        <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>
        <p className="text-left text-muted-foreground w-full">{t.noProjects}</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-shadow-blur">{t.title}</h2>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ExpandableCard
            key={project.id}
            fullContent={
              <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="aspect-video relative w-full">
                  <Image
                    src={project.imageUrl}
                    alt={language === 'pt' ? project.titlePt : project.titleEn}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4 px-4">
                  <h3 className="text-2xl font-semibold">
                    {language === 'pt' ? project.titlePt : project.titleEn}
                  </h3>
                  <p className="text-muted-foreground max-w-3xl">
                    {language === 'pt' ? project.descriptionPt : project.descriptionEn}
                  </p>
                </div>
              </div>
            }
          >
            <div className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl}
                  alt={language === 'pt' ? project.titlePt : project.titleEn}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'pt' ? project.titlePt : project.titleEn}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {language === 'pt' ? project.descriptionPt : project.descriptionEn}
                </p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </motion.div>
    </section>
  );
}