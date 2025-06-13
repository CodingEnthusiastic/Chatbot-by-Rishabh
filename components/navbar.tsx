"use client"

import { useState } from "react"
import { useMode } from "@/context/mode-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Code2, BookOpen, Heart, Dumbbell, Menu, X } from "lucide-react"

export default function Navbar() {
  const { mode, setMode } = useMode()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const modes = [
    { id: "default", name: "Default", icon: <Code2 className="mr-2 h-4 w-4" /> },
    { id: "dsa", name: "DSA Mode", icon: <Code2 className="mr-2 h-4 w-4" /> },
    { id: "upsc", name: "UPSC Prep", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { id: "love", name: "Love Advice", icon: <Heart className="mr-2 h-4 w-4" /> },
    { id: "gym", name: "Gym Mode", icon: <Dumbbell className="mr-2 h-4 w-4" /> },
  ]

  const handleModeChange = (modeId: string) => {
    setMode(modeId)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Rishi ka DSA Guru AI
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-2">
            {modes.map((modeItem) => (
              <Button
                key={modeItem.id}
                variant={modeItem.id === mode ? "default" : "ghost"}
                className="flex items-center"
                onClick={() => handleModeChange(modeItem.id)}
              >
                {modeItem.icon}
                {modeItem.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center">
            <ModeToggle />

            {/* Mobile menu button */}
            <Button variant="ghost" className="md:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {modes.map((modeItem) => (
              <Button
                key={modeItem.id}
                variant={modeItem.id === mode ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleModeChange(modeItem.id)}
              >
                {modeItem.icon}
                {modeItem.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
