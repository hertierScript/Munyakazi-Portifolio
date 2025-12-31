"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/analytics')) {
      return;
    }

    const logVisit = async (type: string) => {
      try {
        await fetch("/api/visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, page: pathname }),
        });
      } catch (error) {
        console.error("Error logging visit:", error);
      }
    };

    // Log start
    logVisit("start");

    // Log page view
    logVisit("page");

    // Log end on unload
    const handleBeforeUnload = () => {
      logVisit("end");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      logVisit("end");
    };
  }, [pathname]);

  return null;
}