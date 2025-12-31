"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  // Form fields - controlled
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [testimony, setTestimony] = useState("");

  // Fetch real data from your database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/admin/api/testimony", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTestimonials(data.testimonies || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  // When user clicks Edit → load THAT specific testimonial into form
  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setFullname(testimonial.fullname);
    setRole(testimonial.role);
    setTestimony(testimonial.testimony);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete - client-side optimistic update (you can add real DELETE later)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/admin/api/testimony/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Check console.");
      // Optional: fallback optimistic delete
      setTestimonials(testimonials.filter((t) => t._id !== id));
    }
  };

  // Submit - Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullname: fullname.trim(),
      role: role.trim(),
      testimony: testimony.trim(),
    };

    if (!payload.fullname || !payload.testimony) {
      alert("Name and testimonial are required.");
      return;
    }

    try {
      if (currentTestimonial) {
        // UPDATE
        const res = await fetch(
          `/admin/api/testimony/${currentTestimonial._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();

        setTestimonials(
          testimonials.map((t) =>
            t._id === currentTestimonial._id ? updated : t
          )
        );
      } else {
        // ADD NEW
        const res = await fetch("/admin/api/testimony", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const newTestimonial = await res.json();

        setTestimonials([...testimonials, newTestimonial]);
      }

      // Reset form
      setFullname("");
      setRole("");
      setTestimony("");
      setCurrentTestimonial(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save. Check console.");
    }
  };

  const handleCancel = () => {
    setFullname("");
    setRole("");
    setTestimony("");
    setCurrentTestimonial(null);
    setIsEditing(false);
  };

  const handleNew = () => {
    setCurrentTestimonial(null);
    setFullname("");
    setRole("");
    setTestimony("");
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-zinc-500">
            Manage what people say about your work and mentorship.
          </p>
        </div>

        {!isEditing && (
          <Button
            onClick={handleNew}
            className="bg-forex text-white hover:bg-forex/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Testimonial
          </Button>
        )}
      </div>

      {/* Form */}
      {isEditing && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>
              {currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Client Name
                  </label>
                  <Input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="e.g. Samuel K."
                    className="bg-zinc-950 border-zinc-800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Role / Position
                  </label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Forex Student"
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">
                  Testimonial Content
                </label>
                <Textarea
                  value={testimony}
                  onChange={(e) => setTestimony(e.target.value)}
                  placeholder="What did they say?"
                  className="bg-zinc-950 border-zinc-800 min-h-40 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-zinc-200"
                >
                  {currentTestimonial ? "Update" : "Save"} Testimonial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            {/* <p className="text-zinc-500 text-lg">No testimonials found.</p> */}
          </div>
        ) : (
          testimonials.map((t) => (
            <Card
              key={t._id}
              className="border-zinc-800 bg-zinc-900/30 relative overflow-hidden hover:bg-zinc-900/40 transition-colors"
            >
              <Quote className="absolute -right-4 -top-4 h-32 w-32 text-zinc-800/20 pointer-events-none" />

              <CardContent className="p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                      <User className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">
                        {t.fullname}
                      </h4>
                      <p className="text-sm text-zinc-500">{t.role}</p>
                    </div>
                  </div>

                  {/* Reliable Edit & Delete Buttons - Same as your Projects page */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={() => handleEdit(t)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                      onClick={() => handleDelete(t._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-zinc-300 italic leading-relaxed">
                  "{t.testimony}"
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
