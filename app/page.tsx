"use client"
import Navbar from "@/components/navbar"
import ChatInterface from "@/components/chat-interface"
import { ModeProvider } from "@/context/mode-context"
import { ChallengeProvider } from "@/context/challenge-context"

export default function Home() {
  return (
    <ModeProvider>
      <ChallengeProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <ChatInterface />
          </main>
          <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
            <p>© 2025 DSA Guru AI - Powered by Rohit Negi's Knowledge</p>
          </footer>
        </div>
      </ChallengeProvider>
    </ModeProvider>
  )
}
