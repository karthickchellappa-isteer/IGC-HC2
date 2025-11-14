import React, { useState } from "react";

const GeminiChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

   const res = await fetch("http://localhost:3001/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input })
});

    const data = await res.json();
    const botMessage = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        💬
      </button>

      {/* Chat Window Popup */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "420px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 6px 26px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Healthcare Cyber Coach 🛡️
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, i) => (
              <p
                key={i}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  background: msg.role === "user" ? "#e1f5fe" : "#f1f1f1",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  margin: "6px 0",
                }}
              >
                <strong>{msg.role === "user" ? "👤" : "🤖"}</strong> {msg.text}
              </p>
            ))}
          </div>

          {/* Input Box */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about healthcare cybersecurity..."
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "10px 14px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChat;
