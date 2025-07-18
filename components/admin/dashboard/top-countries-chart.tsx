"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { country: "India", users: 12500, fill: "var(--color-india)" },
  { country: "USA", users: 4800, fill: "var(--color-usa)" },
  { country: "UK", users: 2100, fill: "var(--color-uk)" },
  { country: "Canada", users: 1800, fill: "var(--color-canada)" },
  { country: "Australia", users: 1500, fill: "var(--color-australia)" },
  { country: "UAE", users: 950, fill: "var(--color-uae)" },
]

const chartConfig = {
  users: {
    label: "Users",
  },
  india: {
    label: "India",
    color: "hsl(var(--chart-1))",
  },
  usa: {
    label: "USA",
    color: "hsl(var(--chart-2))",
  },
  uk: {
    label: "UK",
    color: "hsl(var(--chart-3))",
  },
  canada: {
    label: "Canada",
    color: "hsl(var(--chart-4))",
  },
  australia: {
    label: "Australia",
    color: "hsl(var(--chart-5))",
  },
  uae: {
    label: "UAE",
    color: "hsl(var(--chart-1))",
  },
}

export function TopCountriesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">Top Countries</CardTitle>
        <CardDescription>User distribution by country</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <YAxis
                dataKey="country"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={70}
              />
              <XAxis type="number" hide />
              <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
              <Bar dataKey="users" layout="vertical" radius={5} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
