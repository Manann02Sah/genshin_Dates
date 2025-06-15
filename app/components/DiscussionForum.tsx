"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Send } from "lucide-react"
import type { GenshinCharacter } from "../data/characters"

interface Message {
  id: string
  author: string
  content: string
  timestamp: Date
  characterId: string
  likes: number
  likedBy: string[]
}

interface DiscussionForumProps {
  characters: GenshinCharacter[]
}

export function DiscussionForum({ characters }: DiscussionForumProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<string>(characters[0]?.id || "")

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("genshin-birthday-messages")
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages)
      setMessages(
        parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      )
    }

    // Load author name from localStorage
    const savedAuthor = localStorage.getItem("genshin-forum-author")
    if (savedAuthor) {
      setAuthorName(savedAuthor)
    }
  }, [])

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages)
    localStorage.setItem("genshin-birthday-messages", JSON.stringify(newMessages))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !authorName.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      author: authorName,
      content: newMessage,
      timestamp: new Date(),
      characterId: selectedCharacter,
      likes: 0,
      likedBy: [],
    }

    saveMessages([message, ...messages])
    setNewMessage("")
    localStorage.setItem("genshin-forum-author", authorName)
  }

  const handleLike = (messageId: string) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId) {
        const hasLiked = msg.likedBy.includes(authorName)
        return {
          ...msg,
          likes: hasLiked ? msg.likes - 1 : msg.likes + 1,
          likedBy: hasLiked ? msg.likedBy.filter((name) => name !== authorName) : [...msg.likedBy, authorName],
        }
      }
      return msg
    })
    saveMessages(updatedMessages)
  }

  const getCharacterName = (characterId: string) => {
    return characters.find((char) => char.id === characterId)?.name || "Unknown Character"
  }

  const todaysMessages = messages.filter((msg) => characters.some((char) => char.id === msg.characterId))

  return (
    <div className="space-y-6">
      {/* Post New Message */}
      <Card className="bg-blue-800/30 border-blue-600">
        <CardHeader>
          <CardTitle className="text-amber-300 text-lg">Share Your Birthday Wishes! 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Traveler name..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-blue-900/50 border-blue-600 text-blue-100 placeholder:text-blue-400"
              />
              <select
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                className="bg-blue-900/50 border border-blue-600 rounded-md px-3 py-2 text-blue-100"
              >
                {characters.map((character) => (
                  <option key={character.id} value={character.id}>
                    Wishing {character.name}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              placeholder="Write your birthday message for the character..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-blue-900/50 border-blue-600 text-blue-100 placeholder:text-blue-400 min-h-[100px]"
            />
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!newMessage.trim() || !authorName.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Birthday Wish
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="bg-blue-800/30 border-blue-600">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Birthday Messages ({todaysMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysMessages.length > 0 ? (
            <div className="space-y-4">
              {todaysMessages.map((message) => (
                <div key={message.id} className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-200">{message.author}</span>
                      <Badge variant="outline" className="text-xs border-amber-400 text-amber-300">
                        → {getCharacterName(message.characterId)}
                      </Badge>
                    </div>
                    <span className="text-xs text-blue-400">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-blue-200 mb-3 leading-relaxed">{message.content}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(message.id)}
                      className="text-blue-300 hover:text-red-400 hover:bg-blue-800/50"
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 ${
                          message.likedBy.includes(authorName) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {message.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <p className="text-blue-300">Be the first to wish these characters a happy birthday!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
