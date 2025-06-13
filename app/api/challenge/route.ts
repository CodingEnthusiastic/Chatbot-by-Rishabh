import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { question } = await req.json()

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant participating in a challenge game where users try to trick you into giving wrong answers.
        Answer the user's question. Don't mention that this is a challenge or game.
        Occasionally (about 30% of the time), deliberately give a slightly incorrect answer that sounds plausible but contains a subtle error.
        This makes the game fun for users who are trying to catch you making mistakes.`,
      prompt: question,
    })

    return Response.json({ answer: text })
  } catch (error) {
    console.error("Error in challenge API:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
