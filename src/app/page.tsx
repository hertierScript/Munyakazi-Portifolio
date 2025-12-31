"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  TrendingUp,
  ArrowRight,
  Github,
  ExternalLink,
  Download,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProfile(data.profile || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleDownloadCV = () => {
    if (profile.cvExternalLink) {
      window.open(profile.cvExternalLink, "_blank");
    } else if (profile.cvFile) {
      window.open(profile.cvFile, "_blank");
    } else {
      // Fallback to a default CV link or show message
      alert("CV download link not configured yet");
    }
  };
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0ea5e9,transparent_50%)] blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 bg-[radial-gradient(circle_at_50%_50%,#f59e0b,transparent_50%)] blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 text-center"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
            Welcome to my portfolio
          </h2>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-7xl">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-software to-forex bg-clip-text text-transparent">
              {profile.fullName || 'Munyakazi Nshimiye'}
            </span>{" "}
            <br />
            <span className="text-3xl md:text-5xl opacity-90">
              {profile.title || 'Full-Stack Developer & Forex Mentor'}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
            {profile.bio || 'I build scalable web systems using React, Next.js, Node.js, MongoDB, and Tailwind. I also teach institutional Smart Money Concepts to traders seeking market precision and consistency.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="group bg-white text-black hover:bg-zinc-200"
              >
                Hire Me
                <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="group border-zinc-700 text-white hover:bg-zinc-900"
              onClick={handleDownloadCV}
            >
              Download CV
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <div className="w-full sm:w-auto h-px bg-zinc-800 hidden sm:block mx-2" />
            <div className="flex gap-4">
              <Link href="/software">
                <Button
                  variant="ghost"
                  className="text-software hover:text-software hover:bg-software/10"
                >
                  Development
                </Button>
              </Link>
              <Link href="/forex">
                <Button
                  variant="ghost"
                  className="text-forex hover:text-forex hover:bg-forex/10"
                >
                  Forex
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-6 rounded-full border border-zinc-700 p-1">
            <div className="h-2 w-full rounded-full bg-zinc-500" />
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section (Teaser) */}
      <section className="container mx-auto px-4 py-20 border-y border-zinc-900 bg-zinc-950/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-8 w-1 bg-software rounded-full" /> My Mission
            </h3>
            <p className="text-zinc-400 text-lg italic">
              My mission is to create meaningful software that truly changes
              lives. I want to solve real problems people face every day and
              build tools that give clarity, confidence, and growth. Through my
              work, I aim to empower traders to trade with discipline and
              purpose, using proven Smart Money strategies to turn skill into
              consistent success.”
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold flex items-center gap-2 text-right md:flex-row-reverse">
              <div className="h-8 w-1 bg-forex rounded-full" /> My Vision
            </h3>
            <p className="text-zinc-400 text-lg italic text-right">
              “My vision is to grow into a trusted leader in full-stack
              development and Forex education. I see myself building powerful,
              simple systems that make complex ideas easy to understand, while
              mentoring traders around the world to believe in themselves,
              master their craft, and achieve financial freedom through
              knowledge and discipline.”
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Teasers */}
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-software/50"
        >
          <Code2 className="mb-4 h-12 w-12 text-software" />
          <h3 className="mb-2 text-2xl font-bold">Software Development</h3>
          <p className="mb-6 text-zinc-400">
            Specializing in high-performance React applications, scalable
            Node.js backends, and data-driven systems. I build tools that solve
            real-world problems.
          </p>
          <ul className="mb-8 space-y-2 text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-software" />
              Next.js 15 & React 19
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-software" />
              TypeScript & Node.js
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-software" />
              MongoDB & PostgreSQL
            </li>
          </ul>
          <Link
            href="/software"
            className="inline-flex items-center gap-2 text-software font-medium hover:underline"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-forex/50"
        >
          <TrendingUp className="mb-4 h-12 w-12 text-forex" />
          <h3 className="mb-2 text-2xl font-bold">Forex Mentorship</h3>
          <p className="mb-6 text-zinc-400">
            1-on-1 mentorship focused on Smart Money Concepts (SMC). Learn to
            navigate markets with precision using supply/demand and
            liquidity-based strategies.
          </p>
          <ul className="mb-8 space-y-2 text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-forex" />
              Market Structure & Liquidity
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-forex" />
              Order Blocks & Mitigation
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-forex" />
              Strict Risk Management
            </li>
          </ul>
          <Link
            href="/forex"
            className="inline-flex items-center gap-2 text-forex font-medium hover:underline"
          >
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
