import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const GREETING = {
  role: "assistant",
  content: "Hi! I'm Patrick's AI assistant 👋 Ask me anything about his skills, projects, or background!",
};

const SUGGESTIONS = [
  "What are your skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "Where are you from?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text) => {
    const userText = typeof text === "string" ? text : input.trim();
    if (!userText || loading) return;
    setInput("");

    const next = [...messages, { role: "user", content: userText }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "Sorry, I couldn't get a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat with Patrick's AI">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">P</div>
              <div>
                <p className="chatbot-name">Patrick's AI</p>
                <p className="chatbot-status">● Online</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <i className="bx bx-x" />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${m.role}`}>
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="chatbot-msg chatbot-msg--assistant chatbot-typing">
                <span /><span /><span />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {showSuggestions && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chatbot-suggestion" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              disabled={loading}
              maxLength={300}
            />
            <button
              className="chatbot-send"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <i className="bx bx-send" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className={`chatbot-fab${open ? " chatbot-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <i className={`bx ${open ? "bx-x" : "bx-message-dots"}`} />
      </button>
    </>
  );
}
