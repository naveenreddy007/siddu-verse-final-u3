import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowRight, Cpu, Bot } from "lucide-react"
import type { AIAgent } from "@/lib/agent-data"

interface AgentCardProps {
  agent: AIAgent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.category.toLowerCase()}/${agent.id}`} className="block group">
      <Card className="bg-siddu-dark-grey border-siddu-dark-grey/50 h-full transition-all duration-300 hover:border-siddu-electric-blue hover:shadow-lg hover:shadow-siddu-electric-blue/10 hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-primary-light font-inter group-hover:text-siddu-electric-blue transition-colors">
              {agent.name}
            </CardTitle>
            <div className="p-2 bg-siddu-deep-night rounded-md">
              {agent.category === "Orchestration" ? (
                <Cpu className="w-5 h-5 text-siddu-electric-blue" />
              ) : (
                <Bot className="w-5 h-5 text-siddu-electric-blue" />
              )}
            </div>
          </div>
          <CardDescription className="text-secondary-subtle font-dm-sans">{agent.category} Agent</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-primary-light/90 font-dm-sans text-sm mb-4">{agent.shortDescription}</p>
          <div className="flex justify-end items-center text-sm font-medium text-siddu-electric-blue">
            Scan Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
