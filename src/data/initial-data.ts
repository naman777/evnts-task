import type { Message, Suggestion } from "@/types/chat"

export const initialMessages: Message[] = [
  {
    id: "1",
    sender: "bot",
    content:
      "Hello Fabio Rossi, welcome to ORAVOX, I'm OraclA, your sales intelligence agent. To tailor your experience, please select your role",
    timestamp: new Date().toISOString(),
  },
]

export const initialSuggestions: Suggestion[] = [
  {
    id: "1",
    content: "I am an Owner/Manager",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
  {
    id: "2",
    content: "I am a Realtor",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
]

