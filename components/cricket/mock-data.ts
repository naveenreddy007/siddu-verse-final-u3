import type { CricketMatch, Series, Team, Venue } from "./types"

export const mockTeams: Record<string, Team> = {
  teamA: {
    id: "teamA",
    name: "Team Alpha",
    shortName: "TA",
    logo: "/placeholder-ianw8.png",
    primaryColor: "#FF0000",
    players: [{ id: "player1", name: "Player One", role: "Batsman", country: "Country A" }],
  },
  teamB: {
    id: "teamB",
    name: "Team Bravo",
    shortName: "TB",
    logo: "/team-b-logo.png",
    primaryColor: "#0000FF",
    players: [{ id: "player2", name: "Player Two", role: "Bowler", country: "Country B" }],
  },
}

export const mockVenues: Record<string, Venue> = {
  venue1: {
    id: "venue1",
    name: "Stadium One",
    city: "City A",
    country: "Country A",
    capacity: 10000,
    image: "/placeholder.svg?height=100&width=200",
  },
}

export const mockSeries: Series[] = [
  {
    id: "series1",
    name: "Placeholder Series 2024",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T00:00:00Z",
    matchType: "ODI",
    teams: [mockTeams.teamA, mockTeams.teamB],
    logo: "/placeholder.svg?height=80&width=80",
  },
]

export const mockMatches: CricketMatch[] = [
  {
    id: "match1",
    matchType: "ODI",
    series: { id: "series1", name: "Placeholder Series 2024", logo: "/placeholder.svg?height=30&width=30" },
    status: "Live",
    teams: { home: mockTeams.teamA, away: mockTeams.teamB },
    venue: mockVenues.venue1,
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Started 1 hour ago
    toss: { winner: "teamA", decision: "bat" },
    currentInnings: {
      team: "teamA",
      runs: 50,
      wickets: 1,
      overs: 10.0,
      runRate: 5.0,
      battingOrder: [],
      bowlingFigures: [],
      extras: { wides: 1, noBalls: 0, byes: 0, legByes: 0, penalty: 0, total: 1 },
    },
    innings: [],
    recentBalls: ["1", "0", "4", "W", "0", "1"],
    currentBatsmen: {
      striker: { player: mockTeams.teamA.players[0], runs: 25, balls: 30 },
      nonStriker: {
        player: { id: "player3", name: "Player Three", role: "Batsman", country: "Country A" },
        runs: 5,
        balls: 10,
      },
    },
    currentBowler: { player: mockTeams.teamB.players[0], overs: 2.0, maidens: 0, runs: 10, wickets: 1 },
    partnership: { runs: 10, balls: 15 },
    winProbability: { home: 55, away: 45 },
  },
  {
    id: "match2",
    matchType: "ODI",
    series: { id: "series1", name: "Placeholder Series 2024", logo: "/placeholder.svg?height=30&width=30" },
    status: "Upcoming",
    teams: { home: mockTeams.teamA, away: mockTeams.teamB },
    venue: mockVenues.venue1,
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
  },
  {
    id: "match3",
    matchType: "ODI",
    series: { id: "series1", name: "Placeholder Series 2024", logo: "/placeholder.svg?height=30&width=30" },
    status: "Completed",
    teams: { home: mockTeams.teamA, away: mockTeams.teamB },
    venue: mockVenues.venue1,
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
    toss: { winner: "teamB", decision: "field" },
    innings: [
      {
        team: "teamA",
        runs: 200,
        wickets: 8,
        overs: 50,
        runRate: 4.0,
        battingOrder: [],
        bowlingFigures: [],
        extras: { wides: 2, noBalls: 0, byes: 1, legByes: 0, penalty: 0, total: 3 },
      },
      {
        team: "teamB",
        runs: 201,
        wickets: 5,
        overs: 45.0,
        runRate: 4.46,
        battingOrder: [],
        bowlingFigures: [],
        extras: { wides: 3, noBalls: 1, byes: 0, legByes: 0, penalty: 0, total: 4 },
      },
    ],
    result: { winner: "teamB", margin: "5 wickets", description: "Team Bravo won by 5 wickets" },
    manOfTheMatch: mockTeams.teamB.players[0],
  },
]

export const allMockMatches = [...mockMatches]
export const getLiveMatches = () =>
  allMockMatches.filter((match) => match.status === "Live" || match.status === "Innings Break")
export const getUpcomingMatches = () =>
  allMockMatches
    .filter((match) => match.status === "Upcoming")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
export const getCompletedMatches = () =>
  allMockMatches
    .filter((match) => match.status === "Completed")
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
export const getMatchById = (id: string) => allMockMatches.find((match) => match.id === id)
