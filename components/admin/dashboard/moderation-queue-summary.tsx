"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MessageSquare, ImageIcon, Flag, Clock } from "lucide-react"
import Link from "next/link"

const moderationItems = [
  {
    type: "reviews",
    count: 12,
    label: "Flagged Reviews",
    icon: MessageSquare,
    priority: "high",
    color: "text-red-500",
  },
  {
    type: "images",
    count: 5,
    label: "Inappropriate Images",
    icon: ImageIcon,
    priority: "medium",
    color: "text-orange-500",
  },
  {
    type: "reports",
    count: 8,
    label: "User Reports",
    icon: Flag,
    priority: "high",
    color: "text-red-500",
  },
  {
    type: "pending",
    count: 23,
    label: "Pending Approval",
    icon: Clock,
    priority: "low",
    color: "text-blue-500",
  },
]

export function ModerationQueueSummary() {
  const totalItems = moderationItems.reduce((sum, item) => sum + item.count, 0)
  const highPriorityItems = moderationItems
    .filter((item) => item.priority === "high")
    .reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Moderation Queue
          </CardTitle>
          <CardDescription>Items requiring attention</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/moderation">Review All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-semibold text-lg">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div>
              <Badge variant={highPriorityItems > 0 ? "destructive" : "secondary"}>
                {highPriorityItems} High Priority
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {moderationItems.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
