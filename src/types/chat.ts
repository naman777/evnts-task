export interface Message {
  id: string
  sender: "user" | "bot"
  content: string
  timestamp: string
  currentGoal?: string
  isUserSuggestion?: boolean
}

export interface Suggestion {
  messageId: string
  id: string
  content: string
  clarification: string
  percentageImprovement: number
}

