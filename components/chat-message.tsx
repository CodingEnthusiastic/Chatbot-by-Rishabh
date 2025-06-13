"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Volume2, Mic } from "lucide-react"
import { useMode } from "@/context/mode-context"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: {
    role: string
    content: string
    id: string
    fromVoice?: boolean
    englishContent?: string
  }
  fromVoice?: boolean
  onSpeak?: () => void
}

export default function ChatMessage({ message, fromVoice = false, onSpeak }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const { mode } = useMode()

  const isUser = message.role === "user"

  const getAvatarInfo = () => {
    if (isUser) {
      return {
        image: "/placeholder.svg?height=40&width=40",
        fallback: "U",
        name: "You",
      }
    }

    switch (mode) {
      case "dsa":
        return {
          image: "/placeholder.svg?height=40&width=40",
          fallback: "DS",
          name: "DSA Guru",
        }
      case "upsc":
        return {
          image: "/placeholder.svg?height=40&width=40",
          fallback: "UP",
          name: "UPSC Coach",
        }
      case "love":
        return {
          image: "/placeholder.svg?height=40&width=40",
          fallback: "LA",
          name: "Love Advisor",
        }
      case "gym":
        return {
          image: "/placeholder.svg?height=40&width=40",
          fallback: "GM",
          name: "Gym Trainer",
        }
      default:
        return {
          image: "/placeholder.svg?height=40&width=40",
          fallback: "AI",
          name: "Rohit Negi AI",
        }
    }
  }

  const avatarInfo = getAvatarInfo()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format content to highlight Hindi phrases
  const formatContent = (content: string) => {
    // Simple regex to identify Hindi phrases in quotes
    const hindiPhraseRegex = /"([^"]*)"(\s*$$[^)]*$$)?/g

    // Replace Hindi phrases with styled spans
    return content.replace(hindiPhraseRegex, (match, hindiPhrase, translation) => {
      return `<span class="text-purple-400 font-medium">"${hindiPhrase}"</span>${translation || ""}`
    })
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarInfo.image || "/placeholder.svg"} alt={avatarInfo.name} />
        <AvatarFallback className={isUser ? "bg-gray-300 dark:bg-gray-700" : "bg-purple-200 dark:bg-purple-700"}>
          {avatarInfo.fallback}
        </AvatarFallback>
      </Avatar>

      <Card
        className={`flex-1 ${isUser ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"} border-gray-200 dark:border-gray-700`}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-600 dark:text-gray-400">
                {isUser ? "You" : avatarInfo.name}
              </span>
              {isUser && fromVoice && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/30">
                  <Mic className="h-3 w-3 mr-1" />
                  Voice
                </span>
              )}
              {!isUser && message.englishContent && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/30">
                  Hindi + English
                </span>
              )}
            </div>

            {!isUser && (
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onSpeak}>
                  <Volume2 className="h-3 w-3" />
                  <span className="sr-only">Speak</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {!isUser && mode === "default" ? (
              <div dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
            ) : (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
