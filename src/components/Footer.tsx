"use client";

import Link from "next/link";
import { Code2, TrendingUp, Github, Linkedin, MessageSquare, Settings, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black/50 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="bg-gradient-to-r from-software to-forex bg-clip-text text-transparent">
                INTARE
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-zinc-500">
              Merging technical excellence with market precision. Building high-end 
              digital solutions and mentoring the next generation of profitable traders.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Navigate</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/software" className="hover:text-software transition-colors">Software Dev</Link></li>
              <li><Link href="/forex" className="hover:text-forex transition-colors">Forex Mentorship</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Unified</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Trading Disclaimer</Link></li>
              <li className="pt-4">
                <Link href="/admin" className="flex items-center gap-2 text-zinc-700 hover:text-zinc-400 transition-colors">
                  <Settings className="h-3 w-3" /> Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-900 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Munyakazi Nshimiye. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <a href="https://www.github.com/hertierscript" className="text-zinc-600 hover:text-white transition-colors"><Github className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/munyakazi-nshimiye/" className="text-zinc-600 hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="https://wa.me/+250794386937" className="text-zinc-600 hover:text-white transition-colors"><Send className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
