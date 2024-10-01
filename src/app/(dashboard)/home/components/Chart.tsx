"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  amountFloat: {
    label: "Amount",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Chart({ data }: { data: Donation[] }) {
  let chartData;

  if (data.length === 0) {
    chartData = Array.from({ length: 5 }, (_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() - i))
        .toISOString()
        .split("T")[0],
      amountFloat: Math.random() * 100,
    }));
  } else {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(new Date().setDate(new Date().getDate() - i));
      return date.toISOString().split("T")[0];
    }).reverse();

    const dailyDonations = last7Days.map((date) => {
      const donationsForDay = data.filter(
        (donation) => donation.updatedAt.split("T")[0] === date
      );
      const totalAmount = donationsForDay.reduce(
        (sum, donation) => sum + donation.amountFloat,
        0
      );
      return {
        date,
        amountFloat: totalAmount,
      };
    });

    chartData = dailyDonations;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[200px] md:h-[500px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(5)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-amountFloat)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-amountFloat)"
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="amountFloat"
          type="bump"
          fill="url(#fillAmount)"
          fillOpacity={0.4}
          stroke="var(--color-amountFloat)"
          strokeWidth={3}
        />
      </AreaChart>
    </ChartContainer>
  );
}
