"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ className, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={
        {
          "--color-background": "hsl(var(--background))",
          "--color-foreground": "hsl(var(--foreground))",
          "--color-muted": "hsl(var(--muted))",
          "--color-muted-foreground": "hsl(var(--muted-foreground))",
          "--color-popover": "hsl(var(--popover))",
          "--color-popover-foreground": "hsl(var(--popover-foreground))",
          "--color-card": "hsl(var(--card))",
          "--color-card-foreground": "hsl(var(--card-foreground))",
          "--color-border": "hsl(var(--border))",
          "--color-input": "hsl(var(--input))",
          "--color-primary": "hsl(var(--primary))",
          "--color-primary-foreground": "hsl(var(--primary-foreground))",
          "--color-secondary": "hsl(var(--secondary))",
          "--color-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--color-accent": "hsl(var(--accent))",
          "--color-accent-foreground": "hsl(var(--accent-foreground))",
          "--color-destructive": "hsl(var(--destructive))",
          "--color-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--color-ring": "hsl(var(--ring))",
          "--color-chart-1": "hsl(var(--chart-1))",
          "--color-chart-2": "hsl(var(--chart-2))",
          "--color-chart-3": "hsl(var(--chart-3))",
          "--color-chart-4": "hsl(var(--chart-4))",
          "--color-chart-5": "hsl(var(--chart-5))",
          ...Object.entries(config).reduce(
            (acc, [key, value]) => {
              if (value.color) {
                acc[`--color-${key}`] = value.color
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        } as React.CSSProperties
      }
      {...props}
    />
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(({ className, hideLabel, hideIndicator, indicator = "dot", nameKey, labelKey, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-md",
        className,
      )}
      {...props}
    />
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
