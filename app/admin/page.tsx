import { DashboardKPIs } from "@/components/admin/dashboard/dashboard-kpis"
import { ActivityFeed } from "@/components/admin/dashboard/activity-feed"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { ModerationQueueSummary } from "@/components/admin/dashboard/moderation-queue-summary"
import { SystemHealthSummary } from "@/components/admin/dashboard/system-health-summary"
import { UserGrowthChart } from "@/components/admin/dashboard/user-growth-chart"
import { TopCountriesChart } from "@/components/admin/dashboard/top-countries-chart"
import { RecentContent } from "@/components/admin/dashboard/recent-content"

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <DashboardKPIs />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          <UserGrowthChart />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ActivityFeed />
            <RecentContent />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          <QuickActions />
          <ModerationQueueSummary />
          <SystemHealthSummary />
          <TopCountriesChart />
        </div>
      </div>
    </div>
  )
}
