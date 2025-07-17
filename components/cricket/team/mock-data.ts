import type { TeamProfile } from "./types"

export const getMockTeamData = (id: string): TeamProfile => {
  return {
    id,
    name: "Team Alpha",
    shortName: "TA",
    established: "2000",
    logoUrl: "/placeholder.svg?height=100&width=100",
    homeGround: "Stadium One",
    captain: "Captain Name",
    coach: "Coach Name",
    formats: ["Test", "ODI"],
    teamColors: { primary: "#FF0000", secondary: "#FFFFFF" },
    iccRanking: { test: 1, odi: 2, t20: 3 },
    players: [
      {
        id: "player-1",
        name: "Player One",
        role: "Batsman",
        battingStyle: "Right-handed",
        bowlingStyle: "N/A",
        age: 30,
        imageUrl: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "player-2",
        name: "Player Two",
        role: "Bowler",
        battingStyle: "Left-handed",
        bowlingStyle: "Right-arm fast",
        age: 28,
        imageUrl: "/placeholder.svg?height=80&width=80",
      },
    ],
    recentMatches: [
      {
        id: "match1",
        date: "2024-03-15",
        format: "ODI",
        opponent: { id: "teamB", name: "Team Bravo", logoUrl: "/team-b-logo.png" },
        venue: "Venue Name",
        result: "Team Alpha won",
        scorecard: { team: "250/5", opponent: "200/10" },
      },
    ],
    upcomingMatches: [
      {
        id: "match2",
        date: "2024-04-05",
        format: "Test",
        opponent: { id: "teamC", name: "Team Charlie", logoUrl: "/placeholder.svg?height=40&width=40" },
        venue: "Another Venue",
        result: "Upcoming",
        scorecard: { team: "", opponent: "" },
      },
    ],
    trophies: [
      {
        id: "trophy1",
        name: "Placeholder Trophy",
        year: "2023",
        imageUrl: "/placeholder.svg?height=60&width=60",
        description: "Won the Placeholder Trophy.",
      },
    ],
    statistics: {
      overall: {
        matches: 10,
        wins: 7,
        losses: 2,
        draws: 1,
        winPercentage: 70,
        highestScore: "300/5",
        lowestScore: "100/10",
        venuePerformance: { "Stadium One": 80 },
        rivalRecords: { "Team Bravo": { wins: 2, losses: 0, draws: 0 } },
      },
      formats: {
        test: {
          matches: 2,
          wins: 1,
          losses: 0,
          draws: 1,
          winPercentage: 50,
          highestScore: "500/7d",
          lowestScore: "150/10",
          venuePerformance: { "Stadium One": 100 },
          rivalRecords: { "Team Bravo": { wins: 0, losses: 0, draws: 0 } },
        },
        odi: {
          matches: 8,
          wins: 6,
          losses: 2,
          draws: 0,
          winPercentage: 75,
          highestScore: "300/5",
          lowestScore: "100/10",
          venuePerformance: { "Stadium One": 75 },
          rivalRecords: { "Team Bravo": { wins: 2, losses: 0, draws: 0 } },
        },
      },
    },
  }
}
export const mockTeamIds = ["teamA", "teamB"]
