import {
  Bot,
  Check,
  ChevronDown,
  Circle,
  CloudUpload,
  Code2,
  Github,
  MessageSquareText,
  PlugZap,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { starterTopics } from "../data/mockData";
import { usePersistentState } from "../hooks/usePersistentState";

const icons = {
  chatgpt: MessageSquareText,
  vscode: Code2,
  github: Github,
  vercel: CloudUpload,
  agents: Bot,
  mcp: PlugZap,
};

export function StartHereScreen() {
  const [openTopic, setOpenTopic] = useState("chatgpt");
  const [completed, setCompleted] = usePersistentState<string[]>("ubl-starter-progress", []);
  const totalSteps = starterTopics.reduce((sum, topic) => sum + topic.steps.length, 0);
  const percentage = Math.round((completed.length / totalSteps) * 100);

  const toggleStep = (id: string) => {
    setCompleted(completed.includes(id) ? completed.filter((step) => step !== id) : [...completed, id]);
  };

  return (
    <div className="screen">
      <section className="page-intro start-intro">
        <div>
          <p className="eyebrow eyebrow--teal">A FRIENDLY FIRST PATH</p>
          <h1>Start with what each tool is for.</h1>
          <p className="lead">No alphabet soup. No expectation that you already know the language. Open one card, take one step, and stop when you’ve made progress.</p>
        </div>
        <div className="overall-progress">
          <div className="overall-progress__top"><span>Your path</span><strong>{percentage}%</strong></div>
          <div className="mini-progress"><span style={{ width: `${percentage}%` }} /></div>
          <small>{completed.length} of {totalSteps} small steps complete</small>
        </div>
      </section>

      <section className="plain-promise">
        <span><ShieldCheck size={22} /></span>
        <div>
          <strong>Our plain-language promise</strong>
          <p>If a technical word is useful, we’ll explain it. If it isn’t useful yet, we’ll leave it out.</p>
        </div>
      </section>

      <section className="starter-grid" aria-label="Beginner learning path">
        {starterTopics.map((topic, index) => {
          const Icon = icons[topic.id as keyof typeof icons];
          const isOpen = openTopic === topic.id;
          const topicCompleted = topic.steps.filter((step) => completed.includes(step.id)).length;
          return (
            <article className={`starter-card ${isOpen ? "starter-card--open" : ""}`} key={topic.id}>
              <button
                className="starter-card__trigger"
                onClick={() => setOpenTopic(isOpen ? "" : topic.id)}
                aria-expanded={isOpen}
                aria-controls={`${topic.id}-content`}
              >
                <span className={`tool-icon tool-icon--${(index % 3) + 1}`}><Icon size={23} /></span>
                <span className="starter-card__title">
                  <span>{topic.eyebrow}</span>
                  <strong>{topic.name}</strong>
                </span>
                <span className="topic-count">{topicCompleted}/{topic.steps.length}</span>
                <ChevronDown className="starter-card__chevron" size={20} />
              </button>
              {isOpen && (
                <div className="starter-card__content" id={`${topic.id}-content`}>
                  <p className="starter-card__description">{topic.plainDescription}</p>
                  <div className="why-row">
                    <span>WHY IT MATTERS</span>
                    <p>{topic.whyItMatters}</p>
                  </div>
                  <div className="first-win"><strong>Your first useful win</strong><p>{topic.firstWin}</p></div>
                  <fieldset className="checklist">
                    <legend>Try these small steps</legend>
                    {topic.steps.map((step) => {
                      const isComplete = completed.includes(step.id);
                      return (
                        <label className={`check-row ${isComplete ? "check-row--complete" : ""}`} key={step.id}>
                          <input type="checkbox" checked={isComplete} onChange={() => toggleStep(step.id)} />
                          <span className="check-row__box">{isComplete ? <Check size={15} /> : <Circle size={13} />}</span>
                          <span>{step.label}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
