import React, { useState } from "react";

const GeminiChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "2rem auto" }}>
      <h2>💬 Gemini Cybersecurity Coach</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
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
            <strong>{msg.role === "user" ? "You: " : "Gemini: "}</strong>
            {msg.text}
          </p>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini something..."
          style={{ flexGrow: 1, padding: "10px" }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default GeminiChat;
