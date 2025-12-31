"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  ShieldCheck,
  Zap,
  MessageSquare,
  CheckCircle2,
  Quote,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ForexStudy {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  week: string;
}

interface Testimony {
  _id: string;
  fullname: string;
  role: string;
  testimony: string;
}

const strategyPoints = [
  {
    title: "Market Structure",
    description:
      "Understand the true narrative behind price movements using (Swing Stracture, Internal Stracture and Fractal Stracture).",
    icon: Target,
  },
  {
    title: "Supply & Demand",
    description:
      "Identify high-probability zones where institutional orders are sitting, waiting to be mitigated.",
    icon: Zap,
  },
  {
    title: "Liquidity Concepts",
    description:
      "Learn how to spot 'engineer' liquidity and avoid being the exit liquidity for big players.",
    icon: MessageSquare,
  },
  {
    title: "Risk Management",
    description:
      "Strict 1:3+ RR ratios and psychological coaching to ensure long-term capital preservation.",
    icon: ShieldCheck,
  },
];

export default function ForexPage() {
  const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [forexStudies, setForexStudies] = useState<ForexStudy[]>([]);

  useEffect(() => {
    document.title = "Forex Mentorship - Munyakazi Nshimiye";
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

    const fetchForexStudies = async () => {
      try {
        const res = await fetch("/api/forex", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setForexStudies(data.forexStudies || []);
      } catch (error) {
        console.error("Error fetching forex studies:", error);
        setForexStudies([]);
      }
    };

    fetchTestimonials();
    fetchForexStudies();
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-forex mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest">
          <TrendingUp className="h-4 w-4" /> Mentorship
        </h2>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Master the Markets
        </h1>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Professional 1-on-1 mentorship focusing on institutional trading
          strategies. Move away from retail indicators and learn how the markets
          actually move.
        </p>
        <div className="mt-10">
          <Button size="lg" className="bg-forex text-black hover:bg-forex/90">
            Book 1-on-1 Session
          </Button>
        </div>
      </motion.div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {strategyPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <point.icon className="mb-2 h-8 w-8 text-forex" />
                <CardTitle className="text-xl">{point.title}</CardTitle>
                <CardDescription className="text-zinc-400">
                  {point.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Weekly Study Cases */}
      <section className="mt-32">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-forex text-forex">
            Weekly Analysis
          </Badge>
          <h2 className="mb-6 text-3xl font-bold">Market Study Cases</h2>
          <p className="mx-auto max-w-2xl text-zinc-400">
            Weekly in-depth analysis of market structure, key levels, and
            trading opportunities using institutional trading concepts.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {forexStudies.map((study, index) => (
            <motion.div
              key={study._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-forex/30 transition-colors">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={study.thumbnail}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-forex text-black">{study.week}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-3">
                    {study.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

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

      {/* Disclaimer */}
      <footer className="mt-32 rounded-2xl border border-zinc-800/50 bg-zinc-950 p-6 text-center text-xs text-zinc-500">
        <p className="mx-auto max-w-3xl">
          DISCLAIMER: Trading Forex involves significant risk and is not
          suitable for every investor. Past performance is not indicative of
          future results. The information provided in this mentorship is for
          educational purposes only and does not constitute financial advice.
        </p>
      </footer>
    </div>
  );
}
