"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, MessageCircle, CalendarIcon, Youtube } from "lucide-react"
import Image from "next/image"
import { genshinCharacters, type GenshinCharacter } from "./data/characters"
import { DiscussionForum } from "./components/DiscussionForum"

export default function GenshinBirthdayCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCharacter, setSelectedCharacter] = useState<GenshinCharacter | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [view, setView] = useState<"calendar" | "all" | "favorites">("calendar")

  useEffect(() => {
    const savedFavorites = localStorage.getItem("genshin-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (characterId: string) => {
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId]

    setFavorites(newFavorites)
    localStorage.setItem("genshin-favorites", JSON.stringify(newFavorites))
  }

  const getCharactersForDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return genshinCharacters.filter((char) => char.birthday.month === month && char.birthday.day === day)
  }

  const getTodaysBirthdays = () => {
    const today = new Date()
    return getCharactersForDate(today)
  }

  const getCharactersForMonth = (month: number) => {
    return genshinCharacters.filter((char) => char.birthday.month === month)
  }

  const currentMonth = selectedDate ? selectedDate.getMonth() + 1 : new Date().getMonth() + 1
  const monthCharacters = getCharactersForMonth(currentMonth)
  const todaysBirthdays = getTodaysBirthdays()
  const favoriteCharacters = genshinCharacters.filter((char) => favorites.includes(char.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Add animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-400/30 mb-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-2">
              Genshin Impact Birthday Calendar
            </h1>
            <p className="text-blue-200 text-lg">Celebrate your favorite Travelers' birthdays! ✨</p>
          </div>
        </div>

        {/* Today's Birthdays Alert */}
        {todaysBirthdays.length > 0 && (
          <Card className="mb-6 border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Today's Birthday Celebrations!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {todaysBirthdays.map((character) => (
                  <div key={character.id} className="flex items-center gap-2">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-amber-400"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(character.name.charAt(0))}`
                      }}
                    />
                    <span className="font-semibold text-amber-800">{character.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Tabs */}
        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/50">
            <TabsTrigger value="calendar" className="text-blue-200 data-[state=active]:bg-amber-600">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="all" className="text-blue-200 data-[state=active]:bg-amber-600">
              All Characters
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-blue-200 data-[state=active]:bg-amber-600">
              <Heart className="h-4 w-4 mr-2" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-amber-400/50 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20">
                  <CardTitle className="text-amber-200 text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6" />
                    Birthday Calendar
                  </CardTitle>
                  <p className="text-amber-100/80 text-sm">Click on golden dates to see birthdays! ✨</p>
                </CardHeader>
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-blue-700 bg-white/10 backdrop-blur-sm"
                    modifiers={{
                      birthday: (date) => getCharactersForDate(date).length > 0,
                      today: (date) => {
                        const today = new Date()
                        return date.toDateString() === today.toDateString()
                      },
                    }}
                    modifiersStyles={{
                      birthday: {
                        backgroundColor: "rgb(251 191 36)",
                        color: "rgb(120 53 15)",
                        fontWeight: "bold",
                        border: "2px solid rgb(245 158 11)",
                        borderRadius: "8px",
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 8px rgba(251, 191, 36, 0.3)",
                      },
                      today: {
                        backgroundColor: "rgb(59 130 246)",
                        color: "white",
                        fontWeight: "bold",
                        border: "2px solid rgb(37 99 235)",
                        borderRadius: "8px",
                      },
                    }}
                    modifiersClassNames={{
                      birthday: "animate-pulse",
                    }}
                  />
                </CardContent>
              </Card>

              {/* Selected Date Characters */}
              <Card className="bg-blue-900/30 border-blue-700">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    {selectedDate ? `${selectedDate.toLocaleDateString()} Birthdays` : "Select a Date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate && getCharactersForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getCharactersForDate(selectedDate).map((character) => (
                        <div
                          key={character.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-blue-800/30 cursor-pointer hover:bg-blue-800/50 transition-colors"
                          onClick={() => setSelectedCharacter(character)}
                        >
                          <Image
                            src={character.image || "/placeholder.svg"}
                            alt={character.name}
                            width={50}
                            height={50}
                            className="rounded-full border-2 border-amber-400"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=50&width=50&text=${encodeURIComponent(character.name.charAt(0))}`
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-amber-200">{character.name}</h3>
                            <p className="text-sm text-blue-300">{character.title}</p>
                            <Badge variant="outline" className="text-xs border-amber-400 text-amber-300">
                              {character.element}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(character.id)
                            }}
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(character.id) ? "fill-red-500 text-red-500" : "text-blue-300"}`}
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-blue-300 text-center py-8">
                      {selectedDate ? "No birthdays on this date" : "Select a date to see birthdays"}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* This Month's Birthdays */}
            <Card className="bg-blue-900/30 border-blue-700">
              <CardHeader>
                <CardTitle className="text-amber-300">This Month's Birthdays ({monthCharacters.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {monthCharacters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      isFavorite={favorites.includes(character.id)}
                      onToggleFavorite={() => toggleFavorite(character.id)}
                      onClick={() => setSelectedCharacter(character)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card className="bg-blue-900/30 border-blue-700">
              <CardHeader>
                <CardTitle className="text-amber-300">All Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {genshinCharacters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      isFavorite={favorites.includes(character.id)}
                      onToggleFavorite={() => toggleFavorite(character.id)}
                      onClick={() => setSelectedCharacter(character)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card className="bg-blue-900/30 border-blue-700">
              <CardHeader>
                <CardTitle className="text-amber-300">Your Favorite Characters</CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteCharacters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {favoriteCharacters.map((character) => (
                      <CharacterCard
                        key={character.id}
                        character={character}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(character.id)}
                        onClick={() => setSelectedCharacter(character)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-blue-300 text-center py-8">
                    No favorite characters yet. Click the heart icon on any character to add them!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Discussion Forum for Today's Birthdays */}
        {todaysBirthdays.length > 0 && (
          <Card className="bg-blue-900/30 border-blue-700">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Birthday Wishes & Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DiscussionForum characters={todaysBirthdays} />
            </CardContent>
          </Card>
        )}

        {/* Character Detail Modal */}
        <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
          <DialogContent className="max-w-2xl bg-blue-900 border-amber-400">
            {selectedCharacter && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-amber-300 text-2xl">{selectedCharacter.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedCharacter.image || "/placeholder.svg"}
                      alt={selectedCharacter.name}
                      width={300}
                      height={400}
                      className="rounded-lg border-2 border-amber-400 w-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(selectedCharacter.name)}`
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-amber-200 font-semibold mb-2">Title</h3>
                      <p className="text-blue-200">{selectedCharacter.title}</p>
                    </div>
                    <div>
                      <h3 className="text-amber-200 font-semibold mb-2">Birthday</h3>
                      <p className="text-blue-200">
                        {selectedCharacter.birthday.month}/{selectedCharacter.birthday.day}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-amber-200 font-semibold mb-2">Element & Weapon</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-amber-400 text-amber-300">
                          {selectedCharacter.element}
                        </Badge>
                        <Badge variant="outline" className="border-blue-400 text-blue-300">
                          {selectedCharacter.weapon}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-amber-200 font-semibold mb-2">Region</h3>
                      <p className="text-blue-200">{selectedCharacter.region}</p>
                    </div>
                    <div>
                      <h3 className="text-amber-200 font-semibold mb-2">Bio</h3>
                      <p className="text-blue-200 text-sm leading-relaxed">{selectedCharacter.bio}</p>
                    </div>
                    {selectedCharacter.youtubeLink && (
                      <div>
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          onClick={() => window.open(selectedCharacter.youtubeLink, "_blank")}
                        >
                          <Youtube className="h-4 w-4 mr-2" />
                          Watch Character Teaser
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant={favorites.includes(selectedCharacter.id) ? "default" : "outline"}
                        onClick={() => toggleFavorite(selectedCharacter.id)}
                        className={
                          favorites.includes(selectedCharacter.id)
                            ? "bg-red-600 hover:bg-red-700"
                            : "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        }
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${favorites.includes(selectedCharacter.id) ? "fill-current" : ""}`}
                        />
                        {favorites.includes(selectedCharacter.id) ? "Remove from Favorites" : "Add to Favorites"}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite,
  onClick,
}: {
  character: GenshinCharacter
  isFavorite: boolean
  onToggleFavorite: () => void
  onClick: () => void
}) {
  return (
    <Card
      className="bg-blue-800/30 border-blue-600 hover:border-amber-400 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            width={200}
            height={250}
            className="rounded-lg w-full h-48 object-cover border border-blue-600 group-hover:border-amber-400 transition-colors"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `/placeholder.svg?height=250&width=200&text=${encodeURIComponent(character.name)}`
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          <h3 className="font-semibold text-amber-200 group-hover:text-amber-100">{character.name}</h3>
          <p className="text-sm text-blue-300">{character.title}</p>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs border-amber-400 text-amber-300">
              {character.element}
            </Badge>
            <span className="text-xs text-blue-400">
              {character.birthday.month}/{character.birthday.day}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
