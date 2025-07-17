// Assuming this should be .ts if it's just data
export function getMockTournamentData() {
  return {
    id: "tournament-1",
    name: "Placeholder Tournament 2024",
    shortName: "PT 2024",
    logoUrl: "/generic-tournament-logo.png",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    host: "Country",
    teams: [
      { id: "team-a", name: "Team Alpha", shortName: "TA", logoUrl: "/placeholder-ianw8.png" },
      { id: "team-b", name: "Team Bravo", shortName: "TB", logoUrl: "/team-b-logo.png" },
    ],
    venues: [
      {
        id: "venue-1",
        name: "Stadium One",
        city: "City A",
        country: "Country",
        capacity: 10000,
        imageUrl: "/placeholder.svg?height=100&width=200",
      },
    ],
    format: { type: "League", description: "Round-robin league." },
    standings: [
      {
        position: 1,
        team: { name: "Team Alpha", logoUrl: "/placeholder-ianw8.png" },
        played: 2,
        won: 2,
        lost: 0,
        drawn: 0,
        points: 4,
        netRunRate: 1.5,
        form: ["W", "W"],
        positionChange: "same",
      },
      {
        position: 2,
        team: { name: "Team Bravo", logoUrl: "/team-b-logo.png" },
        played: 2,
        won: 0,
        lost: 2,
        drawn: 0,
        points: 0,
        netRunRate: -1.5,
        form: ["L", "L"],
        positionChange: "same",
      },
    ],
    matches: [
      {
        id: "match-1",
        date: "2024-01-01",
        time: "14:00 UTC",
        teams: {
          team1: { name: "Team Alpha", logoUrl: "/placeholder-ianw8.png" },
          team2: { name: "Team Bravo", logoUrl: "/team-b-logo.png" },
        },
        venue: "Stadium One, City A",
        isCompleted: true,
        result: "Team Alpha won by 5 wickets",
      },
    ],
    statistics: {
      categories: [
        {
          id: "most-runs",
          name: "Most Runs",
          unit: "",
          players: [
            {
              id: "player-1",
              name: "Player One",
              team: { name: "Team Alpha", logoUrl: "/placeholder-ianw8.png" },
              avatarUrl: "/placeholder.svg?height=40&width=40",
              value: 150,
              matches: 2,
            },
          ],
        },
      ],
    },
    history: {
      winners: [
        {
          year: 2023,
          team: { name: "Previous Winner", logoUrl: "/placeholder.svg?height=30&width=30" },
          captain: "Captain Name",
          venue: "Venue Name",
          result: "Won by X runs",
        },
      ],
      records: [
        { type: "Highest Score", player: { name: "Record Holder", team: "Team Name" }, value: "200*", year: 2022 },
      ],
    },
    pulsePosts: [
      {
        id: "post-1",
        author: { name: "Tournament Official", avatarUrl: "/placeholder.svg?height=40&width=40", verified: true },
        content: "Tournament started!",
        timestamp: "2024-01-01T10:00:00Z",
        likes: 100,
        comments: 10,
        shares: 5,
        media: { type: "image", url: "/placeholder.svg?height=200&width=300" },
      },
    ],
  }
}

export function getMockTournamentsList() {
  return [
    {
      id: "tournament-1",
      name: "Placeholder Tournament 2024",
      shortName: "PT 2024",
      logoUrl: "/generic-tournament-logo.png",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "ongoing",
      winner: null,
    },
    {
      id: "tournament-2",
      name: "Past Tournament 2023",
      shortName: "PST 2023",
      logoUrl: "/placeholder.svg?height=50&width=50",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      status: "completed",
      winner: "Team Winner",
    },
  ]
}

export function getMockUpcomingMatches() {
  return [
    {
      id: "match-upcoming-1",
      tournament: { id: "tournament-1", name: "Placeholder Tournament 2024", logoUrl: "/generic-tournament-logo.png" },
      date: "2024-01-15",
      time: "14:00 UTC",
      teams: {
        team1: { id: "team-a", name: "Team Alpha", logoUrl: "/placeholder-ianw8.png" },
        team2: { id: "team-b", name: "Team Bravo", logoUrl: "/team-b-logo.png" },
      },
      venue: "Stadium One, City A",
      isHighlighted: true,
    },
  ]
}
