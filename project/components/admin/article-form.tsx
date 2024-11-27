"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Add type for form data
interface ArticleFormData {
  titleEn: string;
  titlePt: string;
  contentEn: string;
  contentPt: string;
}

export function ArticleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titleEn: formData.get("title_en"),
          titlePt: formData.get("title_pt"),
          contentEn: formData.get("content_en"),
          contentPt: formData.get("content_pt"),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }
      
      e.currentTarget.reset();
      router.refresh();
      toast.success("Article created successfully!");
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create article');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input id="title_en" name="title_en" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title_pt">Title (Portuguese)</Label>
          <Input id="title_pt" name="title_pt" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content_en">Content (English)</Label>
          <Textarea id="content_en" name="content_en" required className="min-h-[200px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content_pt">Content (Portuguese)</Label>
          <Textarea id="content_pt" name="content_pt" required className="min-h-[200px]" />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Article"}
        </Button>
      </form>
    </Card>
  );
}