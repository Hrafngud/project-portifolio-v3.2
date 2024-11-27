export interface Project {
  id: string;
  titleEn: string;
  titlePt: string;
  descriptionEn: string;
  descriptionPt: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  titleEn: string;
  titlePt: string;
  contentEn: string;
  contentPt: string;
  createdAt: Date;
} 