"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Visits",
    color: "hsl(var(--chart-1))",
  },
};

interface LocationsChartProps {
  data: { country: string; count: number; percentage: number }[];
}

export function LocationsChart({ data }: LocationsChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data}>
        <XAxis dataKey="country" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" />
      </BarChart>
    </ChartContainer>
  );
}
