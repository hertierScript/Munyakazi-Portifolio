"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Github,
  Globe,
  Trash2,
  Edit2,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/admin/api/project", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/admin/api/project/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Check console.");
    }
  };

  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setGithub(project.github);
    setLive(project.live);
    setThumbnail(project.thumbnail);
    setTags(project.tags.join(", "));
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      description: description.trim(),
      github: github.trim(),
      live: live.trim(),
      thumbnail: thumbnail.trim(),
      tags: tags.trim(),
    };

    if (!payload.title || !payload.description) {
      alert("Title and description are required.");
      return;
    }

    try {
      if (currentProject) {
        // UPDATE
        const res = await fetch(`/admin/api/project/${currentProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();

        setProjects(
          projects.map((p) => (p._id === currentProject._id ? updated : p))
        );
      } else {
        // ADD NEW
        const res = await fetch("/admin/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const newProject = await res.json();

        setProjects([...projects, newProject]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setGithub("");
      setLive("");
      setThumbnail("");
      setTags("");
      setCurrentProject(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save. Check console.");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setGithub("");
    setLive("");
    setThumbnail("");
    setTags("");
    setCurrentProject(null);
    setIsEditing(false);
  };

  const handleNew = () => {
    setCurrentProject(null);
    setTitle("");
    setDescription("");
    setGithub("");
    setLive("");
    setThumbnail("");
    setTags("");
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Management</h1>
          <p className="text-zinc-500">
            Add, edit, or remove projects from your portfolio.
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => {
              setCurrentProject(null);
              setIsEditing(true);
            }}
            className="bg-software text-white hover:bg-software/90"
          >
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>
              {currentProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Project Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Awesome SaaS"
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    Tech Stack (comma separated)
                  </label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Next.js, Tailwind, etc."
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short overview of the project..."
                  className="bg-zinc-950 border-zinc-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">GitHub URL</label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className="pl-10 bg-zinc-950 border-zinc-800"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Live URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      value={live}
                      onChange={(e) => setLive(e.target.value)}
                      className="pl-10 bg-zinc-950 border-zinc-800"
                      placeholder="https://project.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Thumbnail URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="pl-10 bg-zinc-950 border-zinc-800"
                    placeholder="https://image-url.com"
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
                  {currentProject ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="border-zinc-800 bg-zinc-900/30">
            <CardContent className="flex flex-col md:flex-row gap-6 p-6">
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-white"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-red-400"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-300 border-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 text-xs">
                  <a
                    href={project.github}
                    className="flex items-center gap-1 text-zinc-500 hover:text-software"
                  >
                    <Github className="h-3 w-3" /> GitHub
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-1 text-zinc-500 hover:text-forex"
                  >
                    <Globe className="h-3 w-3" /> Live Demo
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
