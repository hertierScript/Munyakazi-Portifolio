"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  TrendingUp,
  Brain,
  Shield,
  BarChart3,
  Target,
  Eye,
  Download,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  profilePicture?: string;
  bio?: string;
  cvFile?: string;
  cvExternalLink?: string;
  fullName?: string;
  title?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  introText?: string;
  mission?: string;
  vision?: string;
  experience?: Experience[];
  education?: Education[];
}

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-5xl"
      >
        {/* Intro Section */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
              <User className="h-4 w-4" /> About Me
            </h2>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Hi, I’m <br />
              <span className="bg-gradient-to-r from-software to-forex bg-clip-text text-transparent">
                {profile.fullName || "Munyakazi Nshimiye"}
              </span>
            </h1>
            <div className="space-y-4 text-lg text-zinc-400">
              <p>
                {profile.introText ||
                  "As a Full-Stack Developer, I specialize in building modern web applications using React, Next.js, Node.js, and MongoDB. My focus is always on creating clean, efficient, and scalable code. Parallel to my tech career, I am a dedicated Forex Mentor. I teach institutional Smart Money Concepts, specializing in market structure and precision risk management."}
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/contact">
                <Button className="bg-white text-black hover:bg-zinc-200">
                  Hire Me
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-zinc-800 text-white hover:bg-zinc-900"
                onClick={() => {
                  if (profile.cvExternalLink) {
                    window.open(profile.cvExternalLink, "_blank");
                  } else if (profile.cvFile) {
                    window.open(profile.cvFile, "_blank");
                  } else {
                    alert("CV not available");
                  }
                }}
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800">
            <img
              src={
                profile.profilePicture}
              alt={profile.fullName || "Munyakazi Nshimiye"}
              className="h-full w-full object-cover grayscale transition-all hover:grayscale-0"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="my-32 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border-zinc-800 bg-zinc-900/30 p-8">
            <CardContent className="p-0">
              <Target className="mb-4 h-10 w-10 text-software" />
              <h3 className="mb-4 text-2xl font-bold text-white">My Mission</h3>
              <p className="text-zinc-400">
                {profile.mission ||
                  "To build impactful software that solves real-world problems while empowering traders to succeed with proven Smart Money strategies."}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-software rounded-full" />{" "}
                  Professional software solutions
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-software rounded-full" />{" "}
                  Actionable Forex strategies
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-software rounded-full" />{" "}
                  Measurable client results
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/30 p-8">
            <CardContent className="p-0">
              <Eye className="mb-4 h-10 w-10 text-forex" />
              <h3 className="mb-4 text-2xl font-bold text-white">My Vision</h3>
              <p className="text-zinc-400">
                {profile.vision ||
                  "To become a leading expert in full-stack development and Forex education, creating innovative systems and mentoring traders worldwide."}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-forex rounded-full" /> Tech-driven
                  learning platforms
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-forex rounded-full" /> Automation
                  tools for traders
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-forex rounded-full" /> Combined
                  tech-finance skillset
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CV Section */}
        <section id="cv" className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Professional Background
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Experience */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-software">
                <Briefcase className="h-5 w-5" /> Work Experience
              </h3>
              <div className="space-y-8 border-l border-zinc-800 pl-6">
                {(profile.experience || []).map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-software" />
                    <span className="text-sm font-medium text-zinc-500">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-400">{item.company}</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-forex">
                <GraduationCap className="h-5 w-5" /> Education
              </h3>
              <div className="space-y-8 border-l border-zinc-800 pl-6">
                {(profile.education || []).map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-forex" />
                    <span className="text-sm font-medium text-zinc-500">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-400">{item.school}</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-zinc-200"
              onClick={() => {
                if (profile.cvExternalLink) {
                  window.open(profile.cvExternalLink, "_blank");
                } else if (profile.cvFile) {
                  window.open(profile.cvFile, "_blank");
                } else {
                  alert("CV not available");
                }
              }}
            >
              Download Full CV (PDF) <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
