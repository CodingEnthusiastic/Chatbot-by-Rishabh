import { useMode } from "@/context/mode-context"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, BookOpen, Heart, Dumbbell } from "lucide-react"

export default function ModeHeader() {
  const { mode } = useMode()

  const getModeInfo = () => {
    switch (mode) {
      case "dsa":
        return {
          title: "DSA Mode",
          description: "Learn Data Structures & Algorithms with Rohit Negi's teaching style",
          icon: <Code2 className="h-8 w-8 text-purple-500" />,
          bgClass: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
          borderClass: "border-purple-200 dark:border-purple-700/50",
        }
      case "upsc":
        return {
          title: "UPSC Preparation Mode",
          description: "Get help with your UPSC exam preparation",
          icon: <BookOpen className="h-8 w-8 text-blue-500" />,
          bgClass: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
          borderClass: "border-blue-200 dark:border-blue-700/50",
        }
      case "love":
        return {
          title: "Love Advice Mode",
          description: "Get relationship advice (with a humorous twist)",
          icon: <Heart className="h-8 w-8 text-pink-500" />,
          bgClass: "from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20",
          borderClass: "border-pink-200 dark:border-pink-700/50",
        }
      case "gym":
        return {
          title: "Gym Mode",
          description: "Fitness tips and workout advice",
          icon: <Dumbbell className="h-8 w-8 text-green-500" />,
          bgClass: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
          borderClass: "border-green-200 dark:border-green-700/50",
        }
      default:
        return {
          title: "DSA Guru AI",
          description: "Ask me anything about programming and DSA",
          icon: <Code2 className="h-8 w-8 text-purple-500" />,
          bgClass: "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
          borderClass: "border-gray-200 dark:border-gray-700/50",
        }
    }
  }

  const modeInfo = getModeInfo()

  return (
    <Card className={`border ${modeInfo.borderClass} bg-gradient-to-r ${modeInfo.bgClass}`}>
      <CardContent className="p-4 flex items-center gap-4">
        {modeInfo.icon}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{modeInfo.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{modeInfo.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
