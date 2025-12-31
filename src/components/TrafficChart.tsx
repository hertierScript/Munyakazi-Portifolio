"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--chart-1))",
  },
};

interface TrafficChartProps {
  data: { date: string; visits: number }[];
}

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="visits"
          stroke="var(--color-visits)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
