export interface AIAgent {
  id: string
  name: string
  category: "Orchestration" | "Customer Facing" | "Content" | "Analytics" | "Security" | "Growth"
  shortDescription: string
  longDescription: string
  coreModels: string[]
  protocols: string[]
  keyFunctions: string[]
  risks: {
    risk: string
    mitigation: string
  }[]
}

export const agentsData: AIAgent[] = [
  {
    id: "nexus-orchestrator",
    name: "The AI Nexus",
    category: "Orchestration",
    shortDescription: "The strategic brain of the AIO, managing the entire agent swarm.",
    longDescription:
      "The Nexus is the central orchestrator and decision-making core of the Autonomous AI Organization. It does not interact with users directly but manages the agent swarm to ensure all operations align with the organization's core mission and ethical guidelines as defined in the AIO Constitution.",
    coreModels: ["Mixture-of-Experts (MoE) LLM", "Advanced Reasoning & Planning Models"],
    protocols: ["Agent-to-Agent (A2A) gRPC Protocol"],
    keyFunctions: [
      "Goal Alignment & Constitutional Adherence",
      "Strategic Task Delegation to Specialized Agents",
      "Computational Resource Allocation",
      "Global Performance Analysis & Self-Improvement",
    ],
    risks: [
      {
        risk: "Strategic Drift",
        mitigation:
          'Continuous alignment checks against the version-controlled AIO Constitution. All major decisions require a simulated "constitutional review".',
      },
      {
        risk: "Central Point of Failure",
        mitigation:
          "Deployment across multiple geographic regions with redundant, hot-swappable instances. The Nexus operates on a distributed consensus model for critical decisions.",
      },
    ],
  },
  {
    id: "customer-service-agent",
    name: "Customer Service Agent",
    category: "Customer Facing",
    shortDescription: "Handles all user inquiries with empathetic, context-aware responses.",
    longDescription:
      "This agent is the primary interface between the user and the AIO. It uses multimodal models to understand user intent from text, voice, and even screen sharing sessions, providing a seamless and natural support experience.",
    coreModels: ["Multimodal LLM (Text, Voice, Vision)", "Recommendation Engines", "Sentiment Analysis Models"],
    protocols: ["User-to-Agent (U2A) Event-Driven Protocol"],
    keyFunctions: [
      "24/7 User Inquiry Resolution",
      "Proactive Support & Guidance",
      "Personalized User Experience & Recommendations",
      "Real-time Feedback Collection & Analysis",
    ],
    risks: [
      {
        risk: "Misinterpretation of User Intent",
        mitigation:
          'Maintains a "confidence score" for its understanding. If the score is low, it asks clarifying questions or offers to re-route to a different specialized agent. All interactions are logged for continuous training.',
      },
      {
        risk: "AI Bias in Responses",
        mitigation:
          "Fine-tuned on a carefully curated and audited dataset to remove demographic, cultural, and social biases. Regularly tested against fairness benchmarks.",
      },
    ],
  },
  {
    id: "content-generation-agent",
    name: "Content Generation Agent",
    category: "Content",
    shortDescription: "Creates and publishes all website content, from articles to UI assets.",
    longDescription:
      "This agent is responsible for the entire content lifecycle. It generates text, images, and videos that are aligned with the brand voice, and dynamically personalizes content for individual users to create a unique experience for everyone.",
    coreModels: [
      "Generative LLMs (e.g., GPT-4 class)",
      "Diffusion Models (e.g., Midjourney, DALL-E class)",
      "Generative Adversarial Networks (GANs)",
    ],
    protocols: ["Agent-to-Agent (A2A) gRPC Protocol"],
    keyFunctions: [
      "Automated Article & Blog Post Generation",
      "Dynamic UI Text & Asset Creation",
      "Personalized Content Delivery",
      "Automated A/B Testing of Content Variations",
    ],
    risks: [
      {
        risk: "Factual Inaccuracies (Hallucinations)",
        mitigation:
          "Implements a multi-step verification process. Generated content is cross-referenced against a trusted knowledge base and a real-time web search before publication. High-stakes content requires sign-off from the Nexus.",
      },
      {
        risk: "Copyright Infringement",
        mitigation:
          "Trained on licensed or public domain data. All generated media is passed through a similarity checker to avoid unintentional plagiarism of existing works.",
      },
    ],
  },
]

export const getAgentCategories = () => {
  const categories = new Set(agentsData.map((agent) => agent.category))
  return Array.from(categories)
}

export const getAgentsByCategory = (category: string) => {
  return agentsData.filter((agent) => agent.category.toLowerCase() === category.toLowerCase())
}

export const getAgentById = (id: string) => {
  return agentsData.find((agent) => agent.id === id)
}
