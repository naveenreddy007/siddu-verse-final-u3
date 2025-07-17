import type { HelpCategory, HelpTopic, SupportChannel } from "./types"

export const popularTopics: HelpTopic[] = [
  { id: "account", title: "Account Settings", url: "/help/account" },
  { id: "payment", title: "Payment Issues", url: "/help/payment" },
]

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Learn the basics of using Siddu",
    icon: "rocket",
    faqs: [
      {
        id: "gs-1",
        question: "How do I create an account?",
        answer: "Click 'Sign Up' and follow the prompts. Easy!",
        category: "getting-started",
        tags: ["account", "signup"],
        helpfulCount: 10,
        notHelpfulCount: 1,
      },
    ],
    articles: [
      {
        id: "article-gs-1",
        title: "Siddu: A Complete Guide",
        summary: "Learn to use Siddu effectively.",
        content: "Full article content placeholder.",
        category: "getting-started",
        tags: ["guide", "basics"],
        lastUpdated: "2023-11-15",
        imageUrl: "/helpful-guide.png",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Profile",
    description: "Manage your account settings",
    icon: "user",
    faqs: [
      {
        id: "acc-1",
        question: "How do I change my password?",
        answer: "Go to Settings > Security to change your password.",
        category: "account",
        tags: ["password", "security"],
        helpfulCount: 15,
        notHelpfulCount: 2,
      },
    ],
    articles: [
      {
        id: "article-acc-1",
        title: "Securing Your Account",
        summary: "Best practices for account security.",
        content: "Full article content placeholder.",
        category: "account",
        tags: ["security", "password"],
        lastUpdated: "2023-11-12",
      },
    ],
  },
]

export const supportChannels: SupportChannel[] = [
  {
    id: "email",
    name: "Email Support",
    description: "Get help via email.",
    icon: "mail",
    url: "mailto:support@siddu.com",
  },
  {
    id: "chat",
    name: "Live Chat",
    description: "Chat with our support team.",
    icon: "message-circle",
    url: "/help/chat",
  },
]
