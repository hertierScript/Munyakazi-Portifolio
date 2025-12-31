"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileCode2,
  MessageSquareQuote,
  UserCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Globe,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface AnalyticsData {
  total: number;
  totalPercentageChange: number;
  average: number;
  previousAverage: number;
  active: number;
  new: number;
  traffic: { date: string; visits: number }[];
  locations: { country: string; count: number; percentage: number }[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();

  const fetchAnalyticsData = async () => {
    try {
      const [
        totalRes,
        averageRes,
        activeRes,
        newRes,
        trafficRes,
        locationsRes,
      ] = await Promise.all([
        fetch("/api/analytics/total-visitors", { credentials: "include" }),
        fetch("/api/analytics/average-time", { credentials: "include" }),
        fetch("/api/analytics/active-viewers", { credentials: "include" }),
        fetch("/api/analytics/new-viewers", { credentials: "include" }),
        fetch("/api/analytics/traffic-overview", { credentials: "include" }),
        fetch("/api/analytics/top-locations", { credentials: "include" }),
      ]);

      const total = await totalRes.json();
      const average = await averageRes.json();
      const active = await activeRes.json();
      const newViewers = await newRes.json();
      const traffic = await trafficRes.json();
      const locations = await locationsRes.json();

      setAnalyticsData({
        total: total.total,
        totalPercentageChange: total.percentageChange,
        average: average.average,
        previousAverage: average.previousAverage,
        active: active.active,
        new: newViewers.new,
        traffic: traffic.data,
        locations: locations.data,
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const resetAnalyticsData = async () => {
    try {
      const response = await fetch("/api/analytics/reset", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        await fetchAnalyticsData();
      } else {
        alert("Failed to reset analytics data");
      }
    } catch (error) {
      console.error("Error resetting analytics data:", error);
      alert("An error occurred while resetting data");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth == "false") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchAnalyticsData();
    }
    setIsLoadingAuth(false);
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (isLoadingAuth || !isAuthenticated || isLoadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 text-software animate-spin" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white">Error loading analytics data</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-zinc-500">
            Welcome back, Munyakazi. Here's what's happening so far.
          </p>
        </div>
        <Button
          onClick={resetAnalyticsData}
          variant="outline"
          className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Stats
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {analyticsData.total.toLocaleString()}
            </div>
            <p
              className={`text-xs mt-1 ${analyticsData.totalPercentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {analyticsData.totalPercentageChange >= 0 ? "+" : ""}
              {analyticsData.totalPercentageChange}% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Avg. Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white flex items-center gap-2">
              {formatTime(analyticsData.average)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {analyticsData.average > analyticsData.previousAverage
                ? "Up"
                : "Down"}{" "}
              from {formatTime(analyticsData.previousAverage)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Active Viewers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-forex">
              {analyticsData.active}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              New Viewers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {analyticsData.new}
            </div>
            <p className="text-xs text-blue-500 mt-1">Action required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-software" /> Traffic Overview
            </CardTitle>
            <CardDescription>
              Visualizing visitor traffic over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.traffic.map((item) => ({
                    name: item.date,
                    visitors: item.visits,
                  }))}
                >
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#0ea5e9" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#colorVis)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-forex" /> Top Locations
            </CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {analyticsData.locations.slice(0, 4).map((loc, i) => {
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-red-500",
                "bg-zinc-500",
              ];
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300 font-medium">
                      {loc.country}
                    </span>
                    <span className="text-zinc-500">{loc.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${loc.percentage}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${colors[i] || "bg-zinc-500"}`}
                    />
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <Globe className="h-4 w-4" />
                Global reaching audience detected across{" "}
                {analyticsData.locations.length} countries.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/admin/projects">
              <Button
                variant="outline"
                className="w-full h-16 justify-between border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 group text-white"
              >
                <div className="flex items-center gap-3">
                  <FileCode2 className="h-5 w-5 text-software" />
                  <span className="font-medium">Manage Projects</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
              </Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button
                variant="outline"
                className="w-full h-16 justify-between border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 group text-white"
              >
                <div className="flex items-center gap-3">
                  <MessageSquareQuote className="h-5 w-5 text-forex" />
                  <span className="font-medium">Manage Testimonials</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
              </Button>
            </Link>
            <Link href="/admin/forex">
              <Button
                variant="outline"
                className="w-full h-16 justify-between border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 group text-white"
              >
                <div className="flex items-center gap-3">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Forex Case Studies</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
              </Button>
            </Link>
            <Link href="/admin/profile">
              <Button
                variant="outline"
                className="w-full h-16 justify-between border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 group text-white"
              >
                <div className="flex items-center gap-3">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Update Profile & CV</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
              </Button>
            </Link>
          </div>
        </div>

        {/* <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            {[
              { name: "John Smith", email: "john@example.com", type: "Software", date: "2 hours ago" },
              { name: "Alice Brown", email: "alice@trade.com", type: "Mentorship", date: "1 day ago" },
              { name: "Mike Ross", email: "mike@law.com", type: "Software", date: "3 days ago" },
            ].map((inquiry, i) => (
              <div key={i} className="flex items-center justify-between border-b border-zinc-800 p-4 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium text-white">{inquiry.name}</div>
                  <div className="text-xs text-zinc-500">{inquiry.email}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className={inquiry.type === "Software" ? "bg-software/10 text-software" : "bg-forex/10 text-forex"}>
                    {inquiry.type}
                  </Badge>
                  <div className="mt-1 text-[10px] text-zinc-600 uppercase font-bold tracking-wider">{inquiry.date}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-zinc-500 hover:text-white p-0">View all inquiries</Button>
        </div> */}
      </div>
    </div>
  );
}
