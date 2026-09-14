import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { announcements, nextClass } from "../data/mockData";
import { usePersistentState } from "../hooks/usePersistentState";
import type { AppView } from "../types";
import { getClassDateBadge, getLocalClassTime } from "../utils/date";

type HomeScreenProps = { onNavigate: (view: AppView) => void };

const announcementViews: Record<string, AppView> = {
  "Open resources": "resources",
  "Visit Start Here": "start",
  "Open chat": "chat",
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const localTime = getLocalClassTime(nextClass.startsAt);
  const classDateBadge = getClassDateBadge(nextClass.startsAt);
  const todayLabel = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date()).toUpperCase();
  const [reminderSet, setReminderSet] = usePersistentState("ubl-class-reminder", false);
  const [joinOpen, setJoinOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (joinOpen) closeButtonRef.current?.focus();
  }, [joinOpen]);

  return (
    <div className="screen home-screen">
      <section className="welcome-row">
        <div>
          <p className="eyebrow eyebrow--teal"><Sparkles size={14} /> {todayLabel}</p>
          <h1>Welcome back, Nigel.</h1>
          <p className="lead">You’re one clear step away from moving your build forward.</p>
        </div>
        <button className="quiet-button" onClick={() => onNavigate("build")}>
          Continue my build <ArrowRight size={17} />
        </button>
      </section>

      <section className="class-card" aria-labelledby="next-class-title">
        <div className="class-card__glow" />
        <div className="class-card__topline">
          <span className="live-pill"><span /> NEXT LIVE CLASS</span>
          <span className="class-card__format"><Users size={15} /> {nextClass.format}</span>
        </div>
        <div className="class-card__body">
          <div className="class-card__date" aria-hidden="true">
            <span>{classDateBadge.month}</span>
            <strong>{classDateBadge.day}</strong>
          </div>
          <div className="class-card__details">
            <p className="class-card__datetime">
              <CalendarDays size={17} /> {localTime.date}
              <span aria-hidden="true">•</span>
              <Clock3 size={17} /> {localTime.time}
            </p>
            <p className="local-time-note">Shown in your local time · {localTime.timeZone}</p>
            <h2 id="next-class-title">{nextClass.topic}</h2>
            <p>{nextClass.description}</p>
            <div className="class-card__meta">
              <span>{nextClass.duration}</span>
              <span>Beginner-friendly</span>
              <span>Questions welcome</span>
            </div>
          </div>
        </div>
        <div className="class-card__actions">
          <button className="primary-button" onClick={() => setJoinOpen(true)}>
            Join class <ExternalLink size={17} />
          </button>
          <button className={`secondary-button ${reminderSet ? "secondary-button--success" : ""}`} onClick={() => setReminderSet(!reminderSet)}>
            {reminderSet ? <Check size={17} /> : <Bell size={17} />}
            {reminderSet ? "Reminder saved" : "Remind me"}
          </button>
          <p className="action-note">The room opens 10 minutes before class.</p>
        </div>
      </section>

      <div className="home-grid">
        <section className="panel announcement-panel" aria-labelledby="announcements-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT’S NEW</p>
              <h2 id="announcements-title">Announcements</h2>
            </div>
            <span className="count-badge">{announcements.length}</span>
          </div>
          <div className="announcement-list">
            {announcements.map((announcement, index) => (
              <article className="announcement" key={announcement.id}>
                <div className={`announcement__marker announcement__marker--${index + 1}`} />
                <div>
                  <p className="announcement__meta"><span>{announcement.label}</span>{announcement.date}</p>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.body}</p>
                  <button className="text-button" onClick={() => onNavigate(announcementViews[announcement.action])}>
                    {announcement.action} <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="home-side">
          <section className="panel build-preview" aria-labelledby="build-preview-title">
            <div className="section-heading section-heading--compact">
              <div>
                <p className="eyebrow">MY BUILD</p>
                <h2 id="build-preview-title">Client follow-up helper</h2>
              </div>
              <span className="progress-orb" aria-label="60 percent complete">60%</span>
            </div>
            <div className="next-action-card">
              <p>NEXT ACTION</p>
              <strong>Write the three questions every follow-up should answer.</strong>
            </div>
            <div className="mini-progress" aria-label="3 of 5 milestones complete"><span style={{ width: "60%" }} /></div>
            <button className="full-width secondary-button" onClick={() => onNavigate("build")}>
              Open my build <ArrowRight size={16} />
            </button>
          </section>

          <section className="panel community-nudge">
            <span className="community-nudge__icon"><MessageCircle size={21} /></span>
            <div>
              <p className="eyebrow">IN THE LAB</p>
              <h2>Someone may have the same question.</h2>
              <p>Ask the community, share the rough version, or celebrate a small win.</p>
              <button className="text-button" onClick={() => onNavigate("chat")}>
                Go to member chat <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </aside>
      </div>

      {joinOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setJoinOpen(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="join-title">
            <button ref={closeButtonRef} className="icon-button modal__close" onClick={() => setJoinOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
            <span className="modal__icon"><CalendarDays size={25} /></span>
            <p className="eyebrow eyebrow--teal">FOUNDATION PREVIEW</p>
            <h2 id="join-title">Your class room will appear here.</h2>
            <p>This button is intentionally a safe placeholder. No live account or meeting service is connected yet.</p>
            <div className="modal__time">
              <strong>{localTime.date}</strong>
              <span>{localTime.time} · {localTime.timeZone}</span>
            </div>
            <button className="primary-button full-width" onClick={() => setJoinOpen(false)}>Got it</button>
          </section>
        </div>
      )}
    </div>
  );
}
