"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, TrendingUp, User, Mail, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Software", href: "/software", icon: Code2, color: "text-software" },
  { name: "Forex", href: "/forex", icon: TrendingUp, color: "text-forex" },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl md:gap-2"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-white",
                isActive ? "text-white" : "text-zinc-400",
                item.color && isActive && item.color
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 z-0 rounded-full bg-white/10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
