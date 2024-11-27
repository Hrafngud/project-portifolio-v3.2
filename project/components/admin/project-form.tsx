"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function ProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titleEn: formData.get("title_en"),
          titlePt: formData.get("title_pt"),
          descriptionEn: formData.get("description_en"),
          descriptionPt: formData.get("description_pt"),
          imageUrl: formData.get("image_url"),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      
      e.currentTarget.reset();
      router.refresh();
      toast.success("Project created successfully!");
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Project</h2>
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
          <Label htmlFor="description_en">Description (English)</Label>
          <Textarea id="description_en" name="description_en" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description_pt">Description (Portuguese)</Label>
          <Textarea id="description_pt" name="description_pt" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" name="image_url" type="url" required placeholder="https://example.com/image.jpg" />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Project"}
        </Button>
      </form>
    </Card>
  );
}