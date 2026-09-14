import { Hash, Info, LockKeyhole, MessageCircle, Plus, Send, Smile } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { initialMessages } from "../data/mockData";
import { usePersistentState } from "../hooks/usePersistentState";

const channels = [
  { id: "general", label: "general", description: "Questions, ideas, and works in progress", unread: 2 },
  { id: "wins", label: "small-wins", description: "Progress worth noticing", unread: 1 },
  { id: "help", label: "help-desk", description: "There are no bad beginner questions", unread: 0 },
];

export function ChatScreen() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = usePersistentState("ubl-chat-messages", initialMessages);
  const [draft, setDraft] = useState("");
  const currentChannel = channels.find((channel) => channel.id === activeChannel)!;
  const visibleMessages = useMemo(() => messages.filter((message) => message.channel === activeChannel), [messages, activeChannel]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages([
      ...messages,
      {
        id: `local-${Date.now()}`,
        channel: activeChannel,
        name: "Nigel Robinson",
        initials: "NR",
        tone: "gold",
        body,
        time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()),
        mine: true,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="screen chat-page">
      <section className="page-intro page-intro--compact">
        <div>
          <p className="eyebrow eyebrow--teal">BUILD IN GOOD COMPANY</p>
          <h1>Member chat</h1>
          <p className="lead">Bring questions, unfinished thinking, and the small wins that keep you moving.</p>
        </div>
        <div className="demo-pill"><LockKeyhole size={15} /> Preview · saved on this device</div>
      </section>

      <section className="chat-shell">
        <aside className="channel-list" aria-label="Chat channels">
          <div className="channel-list__heading"><span>CHANNELS</span><button className="icon-button" aria-label="Add channel placeholder"><Plus size={17} /></button></div>
          <div className="channel-list__items">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className={`channel-button ${activeChannel === channel.id ? "channel-button--active" : ""}`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <Hash size={17} />
                <span><strong>{channel.label}</strong><small>{channel.description}</small></span>
                {channel.unread > 0 && <span className="channel-unread">{channel.unread}</span>}
              </button>
            ))}
          </div>
          <div className="chat-values">
            <MessageCircle size={19} />
            <p><strong>Be generous. Be clear.</strong><br />Share context, protect private information, and assume good intent.</p>
          </div>
        </aside>

        <div className="conversation">
          <header className="conversation__header">
            <div><h2><Hash size={19} /> {currentChannel.label}</h2><p>{currentChannel.description}</p></div>
            <button className="icon-button" aria-label="Channel information placeholder"><Info size={19} /></button>
          </header>
          <div className="message-list" aria-live="polite">
            <div className="conversation-start">
              <span><Hash size={22} /></span>
              <div><strong>Welcome to {currentChannel.label}.</strong><p>{currentChannel.description}</p></div>
            </div>
            {visibleMessages.length === 0 ? (
              <div className="empty-state">
                <MessageCircle size={28} />
                <h3>Start this conversation.</h3>
                <p>Ask a real question or share what you’re trying to build.</p>
              </div>
            ) : visibleMessages.map((message) => (
              <article className={`message ${message.mine ? "message--mine" : ""}`} key={message.id}>
                <span className={`avatar avatar--${message.tone}`}>{message.initials}</span>
                <div className="message__content">
                  <p className="message__byline"><strong>{message.name}</strong><time>{message.time}</time></p>
                  <p>{message.body}</p>
                </div>
              </article>
            ))}
          </div>
          <form className="message-composer" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="chat-message">Message {currentChannel.label}</label>
            <textarea
              id="chat-message"
              rows={2}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={`Message #${currentChannel.label}`}
            />
            <div className="composer-actions">
              <button type="button" className="icon-button" aria-label="Add a reaction placeholder"><Smile size={19} /></button>
              <span>Enter to send · Shift + Enter for a new line</span>
              <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send message"><Send size={18} /></button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
