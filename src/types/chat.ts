export interface Message {
  id: string
  sender: "user" | "bot"
  content: string
  timestamp: string
  isUserSuggestion?: boolean
}

export interface Suggestion {
  id: string
  content: string
  clarification: string
  percentageImprovement: number
}

