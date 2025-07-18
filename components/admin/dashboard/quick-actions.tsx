"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, BarChart3, Shield, Upload, UserCheck } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Add Movie",
    description: "Add new movie to database",
    icon: Plus,
    href: "/admin/movies/create",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "User Management",
    description: "Manage user accounts",
    icon: Users,
    href: "/admin/users",
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Content Moderation",
    description: "Review flagged content",
    icon: Shield,
    href: "/admin/moderation",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    title: "Analytics",
    description: "View detailed analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Bulk Import",
    description: "Import movies in bulk",
    icon: Upload,
    href: "/admin/movies/bulk-import",
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    title: "Verify Professionals",
    description: "Review verification requests",
    icon: UserCheck,
    href: "/admin/industry/verification",
    color: "text-teal-500",
    bgColor: "bg-teal-100 dark:bg-teal-900/20",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <Button key={action.title} variant="ghost" className="h-auto p-3 justify-start hover:bg-muted/50" asChild>
              <Link href={action.href}>
                <div className={`p-2 rounded-md mr-3 ${action.bgColor}`}>
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
