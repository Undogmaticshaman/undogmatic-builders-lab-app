export type AppView = "home" | "start" | "chat" | "resources" | "build";

export type StarterTopic = {
  id: string;
  name: string;
  eyebrow: string;
  plainDescription: string;
  whyItMatters: string;
  firstWin: string;
  steps: { id: string; label: string }[];
};

export type Resource = {
  id: string;
  title: string;
  type: "Worksheet" | "Guide" | "Transcript";
  description: string;
  meta: string;
  file: string;
};

export type ChatMessage = {
  id: string;
  channel: string;
  name: string;
  initials: string;
  tone: "teal" | "gold" | "cream";
  body: string;
  time: string;
  mine?: boolean;
};
