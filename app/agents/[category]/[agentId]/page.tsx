import { getAgentById, agentsData } from "@/lib/agent-data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Bot, ShieldCheck, Code, AlertTriangle } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props = {
  params: { agentId: string; category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = getAgentById(params.agentId)

  if (!agent) {
    return {
      title: "Agent Not Found",
    }
  }

  return {
    title: `${agent.name} | AI Agent Scanner`,
    description: agent.shortDescription,
    openGraph: {
      title: agent.name,
      description: agent.shortDescription,
      type: "article",
    },
  }
}

export async function generateStaticParams() {
  return agentsData.map((agent) => ({
    category: agent.category.toLowerCase(),
    agentId: agent.id,
  }))
}

export default function AgentDetailPage({ params }: Props) {
  const agent = getAgentById(params.agentId)

  if (!agent) {
    notFound()
  }

  const AgentIcon = agent.category === "Orchestration" ? Cpu : Bot

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: agent.name,
    applicationCategory: "AI",
    description: agent.longDescription,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
    },
    featureList: agent.keyFunctions,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="capitalize">
              {agent.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{agent.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-10">
        <div className="flex items-center mb-4">
          <AgentIcon className="w-10 h-10 mr-4 text-siddu-electric-blue" />
          <div>
            <h1 className="text-4xl font-bold font-inter text-primary-light">{agent.name}</h1>
            <Badge variant="outline" className="mt-1 border-siddu-electric-blue text-siddu-electric-blue">
              {agent.category} Agent
            </Badge>
          </div>
        </div>
        <p className="text-lg text-secondary-subtle max-w-3xl font-dm-sans">{agent.longDescription}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-siddu-dark-grey border-siddu-dark-grey/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-inter">
                <ShieldCheck className="mr-3 text-siddu-electric-blue" />
                Key Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-primary-light/90 font-dm-sans">
                {agent.keyFunctions.map((func, i) => (
                  <li key={i}>{func}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-siddu-dark-grey border-siddu-dark-grey/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-inter">
                <AlertTriangle className="mr-3 text-yellow-400" />
                Risks & Mitigations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {agent.risks.map((r, i) => (
                <div key={i} className="p-4 rounded-md bg-siddu-deep-night/50">
                  <h4 className="font-bold text-yellow-400/90 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {r.risk}
                  </h4>
                  <p className="text-primary-light/80 mt-1 pl-6 text-sm font-dm-sans border-l-2 border-green-400/30 ml-2">
                    <span className="font-semibold text-green-400/90">Mitigation: </span>
                    {r.mitigation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-siddu-dark-grey border-siddu-dark-grey/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-inter">
                <Cpu className="mr-3 text-siddu-electric-blue" />
                Core Models
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {agent.coreModels.map((model, i) => (
                <Badge key={i} variant="secondary" className="bg-siddu-deep-night text-primary-light">
                  {model}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-siddu-dark-grey border-siddu-dark-grey/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-inter">
                <Code className="mr-3 text-siddu-electric-blue" />
                Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {agent.protocols.map((protocol, i) => (
                <Badge key={i} variant="secondary" className="bg-siddu-deep-night text-primary-light">
                  {protocol}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
