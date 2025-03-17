import type { Message, Suggestion } from "@/types/chat";

export const initialMessages: Message[] = [
  {
    id: "1",
    sender: "bot",
    content:
      "Hello Fabio Rossi, welcome to ORAVOX, I’m OracIA, your sales intelligence agent. To tailor your experience, please select your role ",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    sender: "bot",
    content:
      "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    sender: "bot",
    content: "Roger that, what's the name of the real estate company",
    timestamp: new Date().toISOString(),
  },
  {
    id: "4",
    sender: "bot",
    content:
      "Great name! In order for me enhance my intelligence recommendation system  to your company, please provide me the company’s address",
    timestamp: new Date().toISOString(),
  },
];

export const initialSuggestions: Suggestion[] = [
  {
    messageId: "1",
    id: "1",
    content: "I am an Owner/Manager",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
  {
    messageId: "1",
    id: "2",
    content: "I am a Realtor",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
  {
    messageId: "2",
    id: "3",
    content: "We have less then 9 realtors.",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
  {
    messageId: "2",
    id: "4",
    content: "Between 10 to 19 realtors",
    clarification: "Clarifies position",
    percentageImprovement: 15,
  },
  {
    messageId: "3",
    id: "5",
    content: "Evolua Imóveis LTDA",
    clarification: "Provides the company name.",
    percentageImprovement: 15,
  },
  {
    messageId: "3",
    id: "6",
    content: "Evnts ",
    clarification: "Provides the company name.",
    percentageImprovement: 15,
  },
];
