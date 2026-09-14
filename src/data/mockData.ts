import type { ChatMessage, Resource, StarterTopic } from "../types";
import { getNextBuildersLabClassStart } from "../utils/date";

export const nextClass = {
  startsAt: getNextBuildersLabClassStart(),
  topic: "Build a simple workflow that gives you your week back",
  description:
    "Bring one repeated task from your week. We’ll turn it into a clear, reusable process together—one small step at a time.",
  duration: "60 minutes",
  format: "Live workshop",
};

export const announcements = [
  {
    id: "a1",
    date: "Aug 22",
    label: "New this week",
    title: "Your first-build worksheet is ready",
    body: "Use it to choose one useful, finishable project before our next class.",
    action: "Open resources",
  },
  {
    id: "a2",
    date: "Aug 19",
    label: "Class note",
    title: "Bring the messy version",
    body: "You do not need a polished idea. A real problem and a rough starting point are enough.",
    action: "Visit Start Here",
  },
  {
    id: "a3",
    date: "Aug 16",
    label: "Community",
    title: "Share one small win",
    body: "Finished a setup step or asked a useful question? Put it in the wins channel.",
    action: "Open chat",
  },
];

export const starterTopics: StarterTopic[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    eyebrow: "A thinking partner",
    plainDescription: "A conversation tool that helps you explore ideas, write, plan, and work through a problem.",
    whyItMatters: "You can begin with everyday language. You do not need to learn special commands first.",
    firstWin: "Ask it to turn a task you repeat into a short checklist.",
    steps: [
      { id: "chatgpt-open", label: "Open ChatGPT and start a new conversation" },
      { id: "chatgpt-context", label: "Describe one real task in your own words" },
      { id: "chatgpt-review", label: "Check the answer and correct anything that feels wrong" },
    ],
  },
  {
    id: "vscode",
    name: "VS Code",
    eyebrow: "Your project workspace",
    plainDescription: "An app for opening and changing the files that make up a website, tool, or app.",
    whyItMatters: "It keeps your project files together and makes their structure easier to see.",
    firstWin: "Open a project folder and find its main readme file.",
    steps: [
      { id: "vscode-install", label: "Install and open VS Code" },
      { id: "vscode-folder", label: "Open one project folder—not a loose file" },
      { id: "vscode-readme", label: "Find README and read the first section" },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    eyebrow: "A safe project history",
    plainDescription: "A place to store a project and keep a history of the changes made to it.",
    whyItMatters: "If something goes wrong, your earlier work is still recorded. It also makes teamwork easier.",
    firstWin: "Create a private practice project and add a short description.",
    steps: [
      { id: "github-account", label: "Sign in and confirm your profile name" },
      { id: "github-repo", label: "Create one private practice repository" },
      { id: "github-description", label: "Add a one-sentence project description" },
    ],
  },
  {
    id: "vercel",
    name: "Vercel",
    eyebrow: "A way to publish",
    plainDescription: "A service that can turn your website project into a link other people can visit.",
    whyItMatters: "It gives you a clear path from files on your computer to a working web experience.",
    firstWin: "Learn what project you would publish; wait to connect anything until you are ready.",
    steps: [
      { id: "vercel-purpose", label: "Write down what you want to publish" },
      { id: "vercel-source", label: "Identify the matching GitHub project" },
      { id: "vercel-review", label: "Review privacy and cost before connecting an account" },
    ],
  },
  {
    id: "agents",
    name: "Agents",
    eyebrow: "AI that can take steps",
    plainDescription: "An AI helper that can work through several connected steps toward a goal, while you stay in control.",
    whyItMatters: "It can inspect, draft, test, and report back—useful for work that takes more than one answer.",
    firstWin: "Give an agent a small goal, clear boundaries, and a definition of done.",
    steps: [
      { id: "agents-goal", label: "Choose one small, reversible goal" },
      { id: "agents-boundary", label: "Say what the agent must not change" },
      { id: "agents-check", label: "Ask it to show how it checked the result" },
    ],
  },
  {
    id: "mcp",
    name: "MCP servers",
    eyebrow: "Safe connections to tools",
    plainDescription: "Connections that let an AI use a specific tool or information source you choose.",
    whyItMatters: "They can let an agent read a calendar, inspect a project, or use another service—with defined access.",
    firstWin: "List one service you may want an AI to read, and what it should never change.",
    steps: [
      { id: "mcp-service", label: "Choose one useful service or information source" },
      { id: "mcp-access", label: "Decide whether access should be read-only" },
      { id: "mcp-test", label: "Plan one harmless test before trusting the connection" },
    ],
  },
];

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Your first build plan",
    type: "Worksheet",
    description: "Choose a small project, define the useful outcome, and find the very next action.",
    meta: "Markdown · 1 page",
    file: "./resources/first-build-plan.md",
  },
  {
    id: "r2",
    title: "Weekly build check-in",
    type: "Worksheet",
    description: "A five-minute reflection to notice progress, remove friction, and keep moving.",
    meta: "Markdown · 1 page",
    file: "./resources/weekly-build-check-in.md",
  },
  {
    id: "r3",
    title: "Beginner setup links",
    type: "Guide",
    description: "Official starting points for the six tools introduced in Start Here.",
    meta: "Markdown · 6 links",
    file: "./resources/beginner-setup-links.md",
  },
  {
    id: "r4",
    title: "Class transcript: From repeated task to first workflow",
    type: "Transcript",
    description: "A readable sample transcript with the key exercise and attendee questions.",
    meta: "Text · Aug 15, 2026",
    file: "./resources/class-transcript-2026-08-15.txt",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    channel: "general",
    name: "Maya Chen",
    initials: "MC",
    tone: "teal",
    body: "What is everyone bringing to the next class? I’m mapping the follow-up I do after every client call.",
    time: "9:18 AM",
  },
  {
    id: "m2",
    channel: "general",
    name: "Nigel Robinson",
    initials: "NR",
    tone: "gold",
    body: "That’s a great-sized build. Bring the real notes you already use—even if they’re messy.",
    time: "9:24 AM",
  },
  {
    id: "m3",
    channel: "general",
    name: "Jordan Lee",
    initials: "JL",
    tone: "cream",
    body: "I’m working on a weekly content checklist. My first version has only four steps, which feels manageable.",
    time: "10:02 AM",
  },
  {
    id: "m4",
    channel: "wins",
    name: "Jordan Lee",
    initials: "JL",
    tone: "cream",
    body: "Small win: I made my first private GitHub project and wrote down what it is for.",
    time: "Yesterday",
  },
  {
    id: "m5",
    channel: "help",
    name: "Maya Chen",
    initials: "MC",
    tone: "teal",
    body: "Is there a plain-language difference between GitHub and Vercel? I keep mixing up what each one does.",
    time: "Yesterday",
  },
];
