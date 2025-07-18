"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Film, MessageSquare, TrendingUp, Eye, Star, UserPlus, Activity } from "lucide-react"
import { AnimatedNumber } from "@/components/effects/animated-number"

const kpiData = [
  {
    title: "Total Users",
    value: 24567,
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    description: "Active registered users",
  },
  {
    title: "Movies",
    value: 8934,
    change: "+3.2%",
    changeType: "positive" as const,
    icon: Film,
    description: "Total movies in database",
  },
  {
    title: "Reviews",
    value: 45123,
    change: "+18.7%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "User reviews submitted",
  },
  {
    title: "Daily Active Users",
    value: 3456,
    change: "-2.1%",
    changeType: "negative" as const,
    icon: Activity,
    description: "Users active in last 24h",
  },
  {
    title: "Page Views",
    value: 156789,
    change: "+8.9%",
    changeType: "positive" as const,
    icon: Eye,
    description: "Total page views this month",
  },
  {
    title: "Avg Rating",
    value: 7.8,
    change: "+0.3",
    changeType: "positive" as const,
    icon: Star,
    description: "Average movie rating",
  },
  {
    title: "New Signups",
    value: 234,
    change: "+15.2%",
    changeType: "positive" as const,
    icon: UserPlus,
    description: "New users this week",
  },
  {
    title: "Engagement Rate",
    value: 68.5,
    change: "+4.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "User engagement percentage",
  },
]

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={kpi.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedNumber
                value={kpi.value}
                duration={1000 + index * 100}
                decimals={kpi.title === "Avg Rating" || kpi.title === "Engagement Rate" ? 1 : 0}
              />
              {kpi.title === "Engagement Rate" && "%"}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  kpi.changeType === "positive"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {kpi.change}
              </span>
              <span>{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
