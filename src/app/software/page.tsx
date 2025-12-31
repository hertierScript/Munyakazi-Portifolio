"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code2,
  Layers,
  Cpu,
  Globe,
  User,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [];

export default function SoftwarePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTestimonials(data.testimonies || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await fetch("/admin/api/project", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          setProjects([]);
          return;
        }
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };

    fetchTestimonials();
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-software mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest">
          <Code2 className="h-4 w-4" /> Portfolio
        </h2>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Full-Stack Engineering
        </h1>
        <p className="mx-auto max-w-2xl text-zinc-400">
          From architecture to deployment, I build scalable systems and
          intuitive user interfaces using modern technology stacks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group h-full overflow-hidden border-zinc-800 bg-zinc-900/50 transition-all hover:border-software/30">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Code2 className="h-6 w-6 text-software" />
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="mt-4 text-2xl">{project.title}</CardTitle>
                <CardDescription className="text-zinc-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                {/* <Button variant="link" className="px-0 text-software hover:underline">
                  Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button> */}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <section className="mt-32">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
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
                </div>

                <p className="text-zinc-300 italic leading-relaxed">
                  "{t.testimony}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-32 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 md:p-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Frontend</h3>
            <ul className="space-y-2 text-zinc-400">
              <li>React / Next.js 15</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Redux / Zustand</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Backend</h3>
            <ul className="space-y-2 text-zinc-400">
              <li>Node.js / Express</li>
              <li>Python / FastAPI</li>
              <li>PostgreSQL / MongoDB</li>
              <li>Redis / RabbitMQ</li>
              <li>GraphQL / REST</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">
              Cloud & DevOps
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li>AWS / Vercel</li>
              <li>Docker / Kubernetes</li>
              <li>CI/CD (GitHub Actions)</li>
              <li>Unit & E2E Testing</li>
              <li>Performance Monitoring</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
