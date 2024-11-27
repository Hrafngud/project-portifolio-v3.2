// Base types matching the database schema
export interface BaseProject {
  id: string;
  titleEn: string;
  titlePt: string;
  descriptionEn: string;
  descriptionPt: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseArticle {
  id: string;
  titleEn: string;
  titlePt: string;
  contentEn: string;
  contentPt: string;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend types (can be same as base types in this case)
export type Project = BaseProject;
export type Article = BaseArticle;

// Form submission types
export interface ProjectFormData {
  titleEn: string;
  titlePt: string;
  descriptionEn: string;
  descriptionPt: string;
  imageUrl: string;
}

export interface ArticleFormData {
  titleEn: string;
  titlePt: string;
  contentEn: string;
  contentPt: string;
} 