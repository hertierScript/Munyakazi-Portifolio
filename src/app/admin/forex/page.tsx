"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Image as ImageIcon,
  Trash2,
  Edit2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ForexStudy {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  week: string;
}

export default function AdminForexPage() {
  const [forexStudies, setForexStudies] = useState<ForexStudy[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudy, setCurrentStudy] = useState<ForexStudy | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [week, setWeek] = useState("");

  // Fetch forex studies
  useEffect(() => {
    const fetchForexStudies = async () => {
      try {
        const res = await fetch("/admin/api/forex", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setForexStudies(data.forexStudies || []);
      } catch (error) {
        console.error("Error fetching forex studies:", error);
        setForexStudies([]);
      }
    };
    fetchForexStudies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this forex study?")) return;

    try {
      const res = await fetch(`/admin/api/forex/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Delete failed:", res.status, errorText);
        throw new Error(`Delete failed: ${res.status} ${errorText}`);
      }

      setForexStudies(forexStudies.filter((study) => study._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Check console.");
    }
  };

  const handleEdit = (study: ForexStudy) => {
    setCurrentStudy(study);
    setTitle(study.title);
    setDescription(study.description);
    setThumbnail(study.thumbnail);
    setWeek(study.week);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      description: description.trim(),
      thumbnail: thumbnail.trim(),
      week: week.trim(),
    };

    if (!payload.title || !payload.description || !payload.week) {
      alert("Title, description, and week are required.");
      return;
    }

    try {
      if (currentStudy) {
        // UPDATE
        const res = await fetch(`/admin/api/forex/${currentStudy._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();

        setForexStudies(
          forexStudies.map((study) =>
            study._id === currentStudy._id ? updated : study
          )
        );
      } else {
        // ADD NEW
        const res = await fetch("/admin/api/forex", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const newStudy = await res.json();

        setForexStudies([...forexStudies, newStudy]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setThumbnail("");
      setWeek("");
      setCurrentStudy(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save. Check console.");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setThumbnail("");
    setWeek("");
    setCurrentStudy(null);
    setIsEditing(false);
  };

  const handleNew = () => {
    setCurrentStudy(null);
    setTitle("");
    setDescription("");
    setThumbnail("");
    setWeek("");
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Forex Studies</h1>
          <p className="text-zinc-500">
            Manage weekly forex market analysis and study cases.
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={handleNew}
            className="bg-forex text-white hover:bg-forex/90"
          >
            <Plus className="mr-2 h-4 w-4" /> New Study Case
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>
              {currentStudy ? "Edit Study Case" : "Add New Study Case"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Study Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. EUR/USD Weekly Analysis"
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Week</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                      className="pl-10 bg-zinc-950 border-zinc-800"
                      placeholder="e.g. Week 1 - January 2024"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed analysis of the market structure, key levels, and trading opportunities..."
                  className="bg-zinc-950 border-zinc-800 min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Thumbnail URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="pl-10 bg-zinc-950 border-zinc-800"
                    placeholder="https://image-url.com/chart-analysis.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <Button type="button" variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-zinc-200"
                >
                  {currentStudy ? "Update Study" : "Create Study"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Forex Studies List */}
      <div className="grid grid-cols-1 gap-6">
        {forexStudies.map((study) => (
          <Card key={study._id} className="border-zinc-800 bg-zinc-900/30">
            <CardContent className="flex flex-col md:flex-row gap-6 p-6">
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {study.title}
                    </h3>
                    <p className="text-sm text-forex font-medium">
                      {study.week}
                    </p>
                    <p className="text-sm text-zinc-400 line-clamp-3 mt-2">
                      {study.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-white"
                      onClick={() => handleEdit(study)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-red-400"
                      onClick={() => handleDelete(study._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
