"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Database, Cpu, Clock } from "lucide-react"
import Link from "next/link"

const healthItems = [
  { name: "API Services", status: "Operational", icon: Server, color: "text-green-500" },
  { name: "Database", status: "Operational", icon: Database, color: "text-green-500" },
  { name: "Cache Service", status: "Degraded", icon: Cpu, color: "text-amber-500" },
  { name: "Background Jobs", status: "Operational", icon: Clock, color: "text-green-500" },
]

export function SystemHealthSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-bold">System Health</CardTitle>
          <CardDescription>Live status of core services</CardDescription>
        </div>
        <Link href="/admin/system">
          <Button variant="outline" size="sm">
            Details
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 pt-2">
          {healthItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${item.color.replace("text-", "bg-")}`} />
                <span className={`text-sm font-semibold ${item.color}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
