import {
  BookOpen,
  Home,
  Library,
  Menu,
  MessageCircle,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { AppView } from "../types";
import { BrandMark } from "./BrandMark";

type AppShellProps = {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  children: ReactNode;
};

const navigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "start" as const, label: "Start Here", icon: BookOpen },
  { id: "chat" as const, label: "Member Chat", shortLabel: "Chat", icon: MessageCircle },
  { id: "resources" as const, label: "Resources", icon: Library },
  { id: "build" as const, label: "My Build", icon: Sparkles },
];

const viewNames: Record<AppView, string> = {
  home: "Today in the Lab",
  start: "Start Here",
  chat: "Member Chat",
  resources: "Resource Library",
  build: "My Build",
};

export function AppShell({ activeView, onNavigate, children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <aside className={`sidebar ${mobileMenuOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <BrandMark size={46} labelled />
          <div>
            <span className="sidebar__brand-top">UNDOGMATIC</span>
            <span className="sidebar__brand-bottom">BUILDERS LAB</span>
          </div>
          <button className="icon-button sidebar__close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X size={21} />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Main navigation">
          <p className="nav-caption">YOUR LAB</p>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeView === item.id ? "nav-item--active" : ""}`}
                onClick={() => navigate(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.id === "chat" && <span className="nav-dot" aria-label="New messages">3</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="lab-note">
            <span className="lab-note__icon"><Sparkles size={16} /></span>
            <div>
              <strong>Keep it small.</strong>
              <p>One useful next step is enough.</p>
            </div>
          </div>
          <button className="profile-card" aria-label="Open member profile placeholder">
            <span className="avatar avatar--gold">NR</span>
            <span className="profile-card__copy">
              <strong>Nigel</strong>
              <small>Founding member</small>
            </span>
            <Settings size={17} />
          </button>
        </div>
      </aside>

      {mobileMenuOpen && <button className="menu-scrim" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" />}

      <div className="app-stage">
        <header className="topbar">
          <button className="icon-button topbar__menu" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="topbar__mobile-brand"><BrandMark size={34} /></div>
          <p>{viewNames[activeView]}</p>
          <div className="topbar__status"><span className="status-dot" /> Foundation preview</div>
          <button className="avatar avatar--gold topbar__avatar" aria-label="Open member profile placeholder">NR</button>
        </header>

        <main id="main-content" className="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activeView === item.id ? "bottom-nav__item bottom-nav__item--active" : "bottom-nav__item"}
              onClick={() => navigate(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <Icon size={20} />
              <span>{item.shortLabel ?? item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
