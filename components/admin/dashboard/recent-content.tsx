"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Film, MessageSquare, UserCheck, Star } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentMovies = [
  { id: 1, title: "Kalki 2898-AD", year: 2024, poster: "/kalki-2898-ad-inspired-poster.png" },
  { id: 2, title: "Sarfira", year: 2024, poster: "/sarfira-poster.png" },
  { id: 3, title: "Jigra", year: 2024, poster: "/jigra-poster.png" },
]

const latestReviews = [
  { id: 1, user: "Anjali", movie: "Kalki 2898-AD", rating: 8, avatar: "/placeholder-user.jpg" },
  { id: 2, user: "Rohan", movie: "Dune: Part Two", rating: 9, avatar: "/placeholder-user.jpg" },
  { id: 3, user: "Priya", movie: "Oppenheimer", rating: 10, avatar: "/placeholder-user.jpg" },
]

const newTalent = [
  { id: 1, name: "Aarav Sharma", role: "Actor", avatar: "/placeholder-user.jpg" },
  { id: 2, name: "Sanya Mehra", role: "Director", avatar: "/placeholder-user.jpg" },
  { id: 3, name: "Vikram Singh", role: "Cinematographer", avatar: "/placeholder-user.jpg" },
]

export function RecentContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Content</CardTitle>
        <CardDescription>Latest additions to the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="movies">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="movies">
              <Film className="w-4 h-4 mr-2" /> Movies
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <MessageSquare className="w-4 h-4 mr-2" /> Reviews
            </TabsTrigger>
            <TabsTrigger value="talent">
              <UserCheck className="w-4 h-4 mr-2" /> Talent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="movies" className="mt-4 space-y-4">
            {recentMovies.map((movie) => (
              <div key={movie.id} className="flex items-center gap-4">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-10 h-[60px] object-cover rounded-md"
                />
                <div className="flex-grow">
                  <p className="font-semibold">{movie.title}</p>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/movies/${movie.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            {latestReviews.map((review) => (
              <div key={review.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">
                    {review.user} on "{review.movie}"
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {review.rating}/10
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/moderation`}>Moderate</Link>
                </Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="talent" className="mt-4 space-y-4">
            {newTalent.map((talent) => (
              <div key={talent.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={talent.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">{talent.name}</p>
                  <p className="text-sm text-muted-foreground">{talent.role}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/talent-hub/profiles/${talent.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
