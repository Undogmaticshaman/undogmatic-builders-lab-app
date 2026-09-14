import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ChatScreen } from "./screens/ChatScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MyBuildScreen } from "./screens/MyBuildScreen";
import { ResourcesScreen } from "./screens/ResourcesScreen";
import { StartHereScreen } from "./screens/StartHereScreen";
import type { AppView } from "./types";

const views: AppView[] = ["home", "start", "chat", "resources", "build"];

function viewFromHash(): AppView {
  const hash = window.location.hash.replace("#", "") as AppView;
  return views.includes(hash) ? hash : "home";
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>(viewFromHash);

  useEffect(() => {
    const onHashChange = () => setActiveView(viewFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (view: AppView) => {
    setActiveView(view);
    window.history.pushState(null, "", `#${view}`);
  };

  return (
    <AppShell activeView={activeView} onNavigate={navigate}>
      {activeView === "home" && <HomeScreen onNavigate={navigate} />}
      {activeView === "start" && <StartHereScreen />}
      {activeView === "chat" && <ChatScreen />}
      {activeView === "resources" && <ResourcesScreen />}
      {activeView === "build" && <MyBuildScreen />}
    </AppShell>
  );
}
