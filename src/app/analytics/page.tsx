"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { TrafficChart } from "@/components/TrafficChart";
import { LocationsChart } from "@/components/LocationsChart";
import { Button } from "@/components/ui/button";

interface AnalyticsData {
  total: number;
  average: number;
  active: number;
  new: number;
  traffic: { date: string; visits: number }[];
  locations: { country: string; count: number; percentage: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        totalRes,
        averageRes,
        activeRes,
        newRes,
        trafficRes,
        locationsRes,
      ] = await Promise.all([
        fetch("/api/analytics/total-visitors"),
        fetch("/api/analytics/average-time"),
        fetch("/api/analytics/active-viewers"),
        fetch("/api/analytics/new-viewers"),
        fetch("/api/analytics/traffic-overview"),
        fetch("/api/analytics/top-locations"),
      ]);

      const total = await totalRes.json();
      const average = await averageRes.json();
      const active = await activeRes.json();
      const newViewers = await newRes.json();
      const traffic = await trafficRes.json();
      const locations = await locationsRes.json();

      setData({
        total: total.total,
        average: average.average,
        active: active.active,
        new: newViewers.new,
        traffic: traffic.data,
        locations: locations.data,
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!data) {
    return <div className="p-6">Error loading data</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button onClick={fetchData} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Visitors" value={data.total} />
        <StatsCard
          title="Average Time Spent"
          value={formatTime(data.average)}
        />
        <StatsCard title="Active Viewers" value={data.active} />
        <StatsCard title="New Viewers" value={data.new} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Traffic Overview (Last 7 Days)
          </h2>
          <TrafficChart data={data.traffic} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Top Locations</h2>
          <LocationsChart data={data.locations} />
          <div className="mt-4 space-y-2">
            {data.locations.map((loc) => (
              <div key={loc.country} className="flex justify-between">
                <span>{loc.country}</span>
                <span>{loc.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
