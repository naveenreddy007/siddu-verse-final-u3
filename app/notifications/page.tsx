"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { NotificationsHeader } from "@/components/notifications/notifications-header"
import { NotificationFilters } from "@/components/notifications/notification-filters"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { EmptyState } from "@/components/notifications/empty-state"
import { mockNotifications } from "@/components/notifications/mock-data"
import type {
  Notification,
  NotificationFilters as NotificationFiltersType,
  NotificationCounts,
} from "@/components/notifications/types"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filters, setFilters] = useState<NotificationFiltersType>({
    type: "all",
    readStatus: "all",
    dateRange: "all",
  })

  const handleFiltersChange = (newFilters: NotificationFiltersType) => {
    setFilters(newFilters)
  }

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (!notification || typeof notification.type === "undefined") {
        // Guard against undefined notification or missing type
        return false
      }

      // Type filter
      if (filters.type !== "all" && notification.type !== filters.type) {
        return false
      }

      // Read status filter
      if (filters.readStatus === "read" && !notification.isRead) {
        return false
      }
      if (filters.readStatus === "unread" && notification.isRead) {
        return false
      }

      // Date range filter
      if (filters.dateRange !== "all") {
        const now = new Date()
        const notificationDate = new Date(notification.timestamp)
        if (filters.dateRange === "today") {
          if (notificationDate.toDateString() !== now.toDateString()) return false
        } else if (filters.dateRange === "week") {
          const oneWeekAgo = new Date(now.setDate(now.getDate() - 7))
          if (notificationDate < oneWeekAgo) return false
        } else if (filters.dateRange === "month") {
          const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))
          if (notificationDate < oneMonthAgo) return false
        }
      }
      return true
    })
  }, [notifications, filters])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n && !n.isRead).length
  }, [notifications])

  const notificationCounts = useMemo((): NotificationCounts => {
    const counts: NotificationCounts = {
      all: notifications.length,
      social: 0,
      releases: 0,
      system: 0,
      clubs: 0,
      quizzes: 0,
    }
    notifications.forEach((n) => {
      if (n && n.type) {
        // Ensure n and n.type are defined
        switch (n.type) {
          case "social":
            counts.social++
            break
          case "release":
            counts.releases++
            break
          case "system":
            counts.system++
            break
          case "club":
            counts.clubs++
            break
          case "quiz":
            counts.quizzes++
            break
        }
      }
    })
    return counts
  }, [notifications])

  return (
    <motion.div
      className="min-h-screen bg-[#1A1A1A] text-white pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NotificationsHeader unreadCount={unreadCount} onMarkAllRead={markAllAsRead} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <NotificationFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            notificationCounts={notificationCounts}
          />

          <div className="flex-1">
            {filteredNotifications.length > 0 ? (
              <NotificationsList
                notifications={filteredNotifications}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ) : (
              <EmptyState filters={filters} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
