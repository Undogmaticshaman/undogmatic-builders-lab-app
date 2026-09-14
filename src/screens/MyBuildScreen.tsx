import { Check, Circle, Lightbulb, PencilLine, Save, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

type BuildState = {
  name: string;
  outcome: string;
  nextAction: string;
  notes: string;
  checkpoints: { id: string; label: string; complete: boolean }[];
};

const initialBuild: BuildState = {
  name: "Client follow-up helper",
  outcome: "After every client call, I have a clear, warm follow-up ready in under five minutes.",
  nextAction: "Write the three questions every follow-up should answer.",
  notes: "Keep the first version simple. It only needs to turn rough call notes into a useful draft that I review before sending.",
  checkpoints: [
    { id: "b1", label: "Name the repeated task", complete: true },
    { id: "b2", label: "Describe a useful outcome", complete: true },
    { id: "b3", label: "Gather one real example", complete: true },
    { id: "b4", label: "Make the smallest working version", complete: false },
    { id: "b5", label: "Use it once and improve it", complete: false },
  ],
};

export function MyBuildScreen() {
  const [build, setBuild] = usePersistentState<BuildState>("ubl-my-build", initialBuild);
  const [saved, setSaved] = useState(false);
  const completedCount = build.checkpoints.filter((item) => item.complete).length;
  const percentage = Math.round((completedCount / build.checkpoints.length) * 100);

  const update = (field: keyof Pick<BuildState, "name" | "outcome" | "nextAction" | "notes">, value: string) => {
    setBuild({ ...build, [field]: value });
    setSaved(false);
  };

  const toggleCheckpoint = (id: string) => {
    setBuild({
      ...build,
      checkpoints: build.checkpoints.map((item) => item.id === id ? { ...item, complete: !item.complete } : item),
    });
    setSaved(false);
  };

  return (
    <div className="screen">
      <section className="page-intro build-intro">
        <div>
          <p className="eyebrow eyebrow--teal">ONE PROJECT, ONE NEXT STEP</p>
          <h1>My Build</h1>
          <p className="lead">Keep the useful outcome visible. When you return, you should always know what to do next.</p>
        </div>
        <div className="build-score" aria-label={`${percentage} percent complete`}>
          <svg viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="33" />
            <circle cx="40" cy="40" r="33" pathLength="100" strokeDasharray={`${percentage} 100`} />
          </svg>
          <span><strong>{percentage}%</strong><small>complete</small></span>
        </div>
      </section>

      <div className="build-layout">
        <section className="panel build-editor" aria-labelledby="current-build-title">
          <div className="section-heading">
            <div><p className="eyebrow">CURRENT PROJECT</p><h2 id="current-build-title">Shape your build</h2></div>
            <PencilLine size={20} />
          </div>
          <label className="field-label">
            <span>Build name</span>
            <input value={build.name} onChange={(event) => update("name", event.target.value)} />
          </label>
          <label className="field-label">
            <span><Target size={15} /> Useful outcome</span>
            <textarea rows={3} value={build.outcome} onChange={(event) => update("outcome", event.target.value)} />
            <small>Describe what becomes easier or better when this works.</small>
          </label>
          <label className="field-label field-label--next">
            <span><Sparkles size={15} /> Next action</span>
            <textarea rows={2} value={build.nextAction} onChange={(event) => update("nextAction", event.target.value)} />
            <small>Make it small enough to finish in one sitting.</small>
          </label>
          <label className="field-label">
            <span>Working notes</span>
            <textarea rows={5} value={build.notes} onChange={(event) => update("notes", event.target.value)} />
          </label>
          <button className={`primary-button save-button ${saved ? "save-button--saved" : ""}`} onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2400); }}>
            {saved ? <Check size={18} /> : <Save size={18} />}{saved ? "Saved on this device" : "Save my build"}
          </button>
        </section>

        <aside className="build-sidebar">
          <section className="panel milestone-panel" aria-labelledby="milestones-title">
            <div className="section-heading section-heading--compact">
              <div><p className="eyebrow">PROGRESS</p><h2 id="milestones-title">Build milestones</h2></div>
              <span className="count-badge">{completedCount}/{build.checkpoints.length}</span>
            </div>
            <div className="milestone-list">
              {build.checkpoints.map((item) => (
                <label className={`milestone ${item.complete ? "milestone--complete" : ""}`} key={item.id}>
                  <input type="checkbox" checked={item.complete} onChange={() => toggleCheckpoint(item.id)} />
                  <span>{item.complete ? <Check size={16} /> : <Circle size={15} />}</span>
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="build-tip">
            <span><Lightbulb size={21} /></span>
            <div><strong>Clarity beats size.</strong><p>A tiny build you use this week will teach you more than a perfect plan you never test.</p></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
