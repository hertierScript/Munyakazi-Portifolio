"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MessageSquare,
  Send,
  Globe,
  Phone,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      purpose: formData.get("purpose") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
          <Mail className="h-4 w-4" /> Get In Touch
        </h2>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Let's Start a Conversation
        </h1>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Looking to work together? Whether you have a software project in mind
          or want to take your trading to the next level, I'm here to connect.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {/* My Ideas of EMAIL SENDING // onSubmit={handleSubmit}*/}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Name</label>
                    <Input
                      name="name"
                      placeholder="John Doe"
                      className="border-zinc-800 bg-zinc-950"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      className="border-zinc-800 bg-zinc-950"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Purpose</label>
                  <Select name="purpose" required>
                    <SelectTrigger className="border-zinc-800 bg-zinc-950">
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-950">
                      <SelectItem value="development">
                        Software Development
                      </SelectItem>
                      <SelectItem value="mentorship">
                        Forex Mentorship
                      </SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="other">Other Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project or trading goals..."
                    className="min-h-[150px] border-zinc-800 bg-zinc-950"
                    required
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-900/50 border border-green-700 rounded-md text-green-300 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-300 text-sm">
                    Failed to send message. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}{" "}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div>
            <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto:hertiermunyakazi@gmail.com"
                className="flex items-center gap-4 text-zinc-400 transition-colors hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                  <Mail className="h-5 w-5" />
                </div>
                <span>Email me</span>
              </a>
              <a
                href="tel:+250794386937"
                className="flex items-center gap-4 text-zinc-400 transition-colors hover:text-green-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                  <Phone className="h-5 w-5" />
                </div>
                <span>Text me</span>
              </a>
              <a
                href="https://wa.me/+250794386937"
                className="flex items-center gap-4 text-zinc-400 transition-colors hover:text-green-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                  <Send className="h-5 w-5" />
                </div>
                <span>WhatsApp</span>
              </a>
              {/* <div className="flex items-center gap-4 text-zinc-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                  <Globe className="h-5 w-5" />
                </div>
                <span>Remote / Worldwide</span>
              </div> */}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Connect on Socials</h3>
            <div className="flex gap-4">
              <a
                href="https://www.github.com/hertierscript"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:border-software hover:text-software"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/munyakazi-nshimiye/"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:border-blue-500 hover:text-blue-500"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/munya.kazii"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:border-forex hover:text-forex"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="mb-2 font-bold text-white">Project Availability</h3>
            <p className="text-sm text-zinc-400">
              I'm currently accepting new software projects and enrolling
              students for the next 1-on-1 mentorship cohort. Response time is
              typically within 24 hours.
            </p>
            <div className="mt-4 flex gap-4">
              <Button
                size="sm"
                variant="outline"
                className="border-software/30 text-software hover:bg-software/10"
              >
                Start Project
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-forex/30 text-forex hover:bg-forex/10"
              >
                Book Mentorship
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
