"use client";

import { useState, useEffect } from "react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  title: string;
  school: string;
  period: string;
  description: string;
}

interface Profile {
  profilePicture: string;
  bio: string;
  cvFile: string;
  cvExternalLink: string;
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  introText: string;
  mission: string;
  vision: string;
  experience: Experience[];
  education: Education[];
}
import {
  User,
  Camera,
  FileText,
  Download,
  Save,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    profilePicture: "",
    bio: "",
    cvFile: "",
    cvExternalLink: "",
    fullName: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    instagram: "",
    introText: "",
    mission: "",
    vision: "",
    experience: [],
    education: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/admin/api/profile");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.profile) {
          setProfile((prev) => ({ ...prev, ...data.profile }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/admin/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Profile & CV Management
        </h1>
        <p className="text-zinc-500">
          Update your public identity and professional documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              This is visible on your home and about pages.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative h-40 w-40 rounded-full overflow-hidden border-2 border-software">
              <img
                src={
                  profile.profilePicture ||
                  "https://image2url.com/r2/bucket2/images/1766786610666-5ca103d3-80f4-4c7d-b2c3-05f0b2f3a9f2.jpg"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="w-full space-y-2">
              <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider text-center block">
                Image URL
              </label>
              <Input
                value={profile.profilePicture}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    profilePicture: e.target.value,
                  }))
                }
                className="bg-zinc-950 border-zinc-800 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* CV Management */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-2">
          <CardHeader>
            <CardTitle>Professional CV</CardTitle>
            <CardDescription>
              Manage your resume file and download link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">
                  myUpdatedCv.pdf
                </div>
                <div className="text-xs text-zinc-500">
                  Last updated: 2 days ago
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800"
                onClick={() => {
                  if (profile.cvExternalLink) {
                    window.open(profile.cvExternalLink, "_blank");
                  } else if (profile.cvFile) {
                    window.open(profile.cvFile, "_blank");
                  } else {
                    alert("No CV link configured");
                  }
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">
                  External CV Link (Google Drive/Dropbox)
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    value={profile.cvExternalLink}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        cvExternalLink: e.target.value,
                      }))
                    }
                    placeholder="https://drive.google.com/..."
                    className="pl-10 bg-zinc-950 border-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                >
                  <Save className="mr-2 h-4 w-4" />{" "}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" className="border-zinc-800">
                  Upload New PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Update */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Bio Update</CardTitle>
            <CardDescription>
              This appears in your home page hero section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Hi, I'm Munyakazi Nshimiye..."
              className="min-h-[100px] bg-zinc-950 border-zinc-800"
            />
          </CardContent>
        </Card>

        {/* About Page Content */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-3">
          <CardHeader>
            <CardTitle>About Page Content</CardTitle>
            <CardDescription>
              Edit content displayed on your about page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Intro Text</label>
              <Textarea
                value={profile.introText}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, introText: e.target.value }))
                }
                placeholder="As a Full-Stack Developer..."
                className="min-h-[100px] bg-zinc-950 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Mission</label>
              <Textarea
                value={profile.mission}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, mission: e.target.value }))
                }
                placeholder="To build impactful software..."
                className="min-h-[80px] bg-zinc-950 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Vision</label>
              <Textarea
                value={profile.vision}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, vision: e.target.value }))
                }
                placeholder="To become a leading expert..."
                className="min-h-[80px] bg-zinc-950 border-zinc-800"
              />
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-3">
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Add your professional experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className="p-4 border border-zinc-800 rounded-lg space-y-2"
              >
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...profile.experience];
                    newExp[index].title = e.target.value;
                    setProfile((prev) => ({ ...prev, experience: newExp }));
                  }}
                  placeholder="Job Title"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...profile.experience];
                    newExp[index].company = e.target.value;
                    setProfile((prev) => ({ ...prev, experience: newExp }));
                  }}
                  placeholder="Company"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Input
                  value={exp.period}
                  onChange={(e) => {
                    const newExp = [...profile.experience];
                    newExp[index].period = e.target.value;
                    setProfile((prev) => ({ ...prev, experience: newExp }));
                  }}
                  placeholder="Period (e.g., 2023 - Present)"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...profile.experience];
                    newExp[index].description = e.target.value;
                    setProfile((prev) => ({ ...prev, experience: newExp }));
                  }}
                  placeholder="Description"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newExp = profile.experience.filter(
                      (_, i) => i !== index
                    );
                    setProfile((prev) => ({ ...prev, experience: newExp }));
                  }}
                  className="border-zinc-800"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    { title: "", company: "", period: "", description: "" },
                  ],
                }));
              }}
              variant="outline"
              className="border-zinc-800"
            >
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-3">
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Add your educational background.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.education.map((edu, index) => (
              <div
                key={index}
                className="p-4 border border-zinc-800 rounded-lg space-y-2"
              >
                <Input
                  value={edu.title}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[index].title = e.target.value;
                    setProfile((prev) => ({ ...prev, education: newEdu }));
                  }}
                  placeholder="Degree/Program"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Input
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[index].school = e.target.value;
                    setProfile((prev) => ({ ...prev, education: newEdu }));
                  }}
                  placeholder="School"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Input
                  value={edu.period}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[index].period = e.target.value;
                    setProfile((prev) => ({ ...prev, education: newEdu }));
                  }}
                  placeholder="Period (e.g., 2020 - 2023)"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Textarea
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[index].description = e.target.value;
                    setProfile((prev) => ({ ...prev, education: newEdu }));
                  }}
                  placeholder="Description"
                  className="bg-zinc-950 border-zinc-800"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newEdu = profile.education.filter(
                      (_, i) => i !== index
                    );
                    setProfile((prev) => ({ ...prev, education: newEdu }));
                  }}
                  className="border-zinc-800"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    { title: "", school: "", period: "", description: "" },
                  ],
                }));
              }}
              variant="outline"
              className="border-zinc-800"
            >
              Add Education
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
