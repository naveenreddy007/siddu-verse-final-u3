// This file contains data, not components. No changes needed here regarding exports.
// Assuming it's correctly structured as per the previous step.
import {
  Film,
  Users,
  Zap,
  ShieldCheck,
  BarChart3,
  type LucideIcon,
  TrendingUp,
  Tv,
  Palette,
  MessageSquare,
  SearchCode,
  SparklesIcon,
} from "lucide-react"

export interface SubFeature {
  id: string
  title: string
  icon: LucideIcon
  description: string
}

export interface MainFeatureNode {
  id: string
  title: string
  tagline: string
  icon: LucideIcon
  colorName: string // e.g., 'sky', 'purple', 'rose', 'teal', 'amber'
  subFeatures: SubFeature[]
}

export const sidduFeatures: MainFeatureNode[] = [
  {
    id: "cinema",
    title: "Global Cinema Hub",
    tagline: "Explore films, reviews, and deep dives.",
    icon: Film,
    colorName: "sky",
    subFeatures: [
      { id: "sf1", title: "SidduScore™", icon: ShieldCheck, description: "Unbiased, comprehensive ratings." },
      { id: "sf2", title: "Verified Reviews", icon: MessageSquare, description: "Trustworthy community insights." },
      { id: "sf3", title: "Scene Explorer", icon: SearchCode, description: "Iconic moments, deconstructed." },
    ],
  },
  {
    id: "cricket",
    title: "Cricket Fan Zone",
    tagline: "Live scores, stats, and match insights.",
    icon: TrendingUp,
    colorName: "emerald",
    subFeatures: [
      { id: "cf1", title: "Real-time Updates", icon: Zap, description: "Never miss a moment of the action." },
      { id: "cf2", title: "Player Statistics", icon: BarChart3, description: "In-depth performance analysis." },
      { id: "cf3", title: "Match Commentary", icon: MessageSquare, description: "Ball-by-ball expert insights." },
    ],
  },
  {
    id: "talent",
    title: "Talent & Industry Hub",
    tagline: "Discover talent, post calls, connect.",
    icon: Users,
    colorName: "purple",
    subFeatures: [
      { id: "tf1", title: "Casting Calls", icon: Tv, description: "Find your next big role or star." },
      { id: "tf2", title: "Professional Profiles", icon: Users, description: "Showcase your skills and experience." },
      {
        id: "tf3",
        title: "Verified Credentials",
        icon: ShieldCheck,
        description: "Connect with trusted professionals.",
      },
    ],
  },
  {
    id: "pulse",
    title: "Community Pulse",
    tagline: "Join discussions, share thoughts.",
    icon: MessageSquare,
    colorName: "rose",
    subFeatures: [
      { id: "pf1", title: "Trending Topics", icon: TrendingUp, description: "See what everyone is talking about." },
      { id: "pf2", title: "Create Pulses", icon: SparklesIcon, description: "Share your unique take with the world." },
      { id: "pf3", title: "Engage & Connect", icon: Users, description: "Build your network within the community." },
    ],
  },
  {
    id: "visuals",
    title: "Visual Treats",
    tagline: "A feast for the eyes, curated cinematic beauty.",
    icon: Palette,
    colorName: "amber",
    subFeatures: [
      { id: "vt1", title: "Stunning Stills", icon: SearchCode, description: "Explore breathtaking cinematography." },
      { id: "vt2", title: "Color Palettes", icon: Palette, description: "Analyze the visual language of film." },
      { id: "vt3", title: "Behind the Scenes", icon: Film, description: "Discover the art of filmmaking." },
    ],
  },
]
