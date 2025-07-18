"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Film, UserPlus, Star, Flag, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"

const activities = [
  {
    id: 1,
    type: "new_movie",
    title: "New movie added",
    description: "Kalki 2898-AD has been added to the database",
    user: "Admin",
    avatar: "/placeholder-user.jpg",
    timestamp: "2 minutes ago",
    icon: Film,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: 2,
    type: "review_flagged",
    title: "Review flagged for moderation",
    description: "User review contains inappropriate content",
    user: "System",
    avatar: "/placeholder-user.jpg",
    timestamp: "5 minutes ago",
    icon: Flag,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    id: 3,
    type: "user_signup",
    title: "New user registered",
    description: "Priya Sharma joined the platform",
    user: "Priya Sharma",
    avatar: "/placeholder-user.jpg",
    timestamp: "12 minutes ago",
    icon: UserPlus,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: 4,
    type: "high_rating",
    title: "High rating received",
    description: "Oppenheimer received a 10/10 rating",
    user: "Rohan Kumar",
    avatar: "/placeholder-user.jpg",
    timestamp: "18 minutes ago",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: 5,
    type: "content_approved",
    title: "Content approved",
    description: "Movie poster for Jigra has been approved",
    user: "Moderator",
    avatar: "/placeholder-user.jpg",
    timestamp: "25 minutes ago",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: 6,
    type: "system_alert",
    title: "System maintenance scheduled",
    description: "Database maintenance scheduled for tonight",
    user: "System",
    avatar: "/placeholder-user.jpg",
    timestamp: "1 hour ago",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities and events</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/analytics">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-full ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.timestamp}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
