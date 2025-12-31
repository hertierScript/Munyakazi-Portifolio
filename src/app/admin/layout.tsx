"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileCode2,
  MessageSquareQuote,
  UserCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FileCode2 },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
  },
  { href: "/admin/forex", label: "Forex Studies", icon: TrendingUp },
  { href: "/admin/profile", label: "Profile & CV", icon: UserCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isOpen, setIsOpen] = useState(false);

  if (isLoginPage) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  const SidebarContent = () => (
    <>
      <div className="mb-8 px-2 text-xl font-bold bg-gradient-to-r from-software to-forex bg-clip-text text-transparent">
        Admin Panel
      </div>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-500 hover:text-red-400"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
      <nav className="space-y-2 flex-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Icon
                className={cn("h-4 w-4", isActive ? "text-software" : "")}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40 md:hidden text-zinc-500 bg-zinc-900"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 bg-zinc-950 border-zinc-800 p-6"
        >
          <SheetTitle className="sr-only">Admin Panel</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container p-8">
          {/* Mobile Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm md:hidden ml-16">
            <Link href="/admin" className="text-zinc-500">
              Admin
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-700" />
            <span className="text-white capitalize">
              {pathname.split("/").pop() || "Dashboard"}
            </span>
          </div>
          {/* Desktop Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 mb-6 text-sm">
            <Link href="/admin" className="text-zinc-500">
              Admin
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-700" />
            <span className="text-white capitalize">
              {pathname.split("/").pop() || "Dashboard"}
            </span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
