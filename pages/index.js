import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post("https://xvaai-guru.vercel.app/api/chat", { text: question });
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(to bottom right, #e0f2fe, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#1d4ed8", fontSize: "2rem", marginBottom: "0.5rem" }}>
          👨‍🏫 Guru AI
        </h1>
        <p style={{ color: "#475569", marginBottom: "1.5rem" }}>
          Tanyakan apa pun ke AI Guru yang sabar dan bijak ✨
        </p>

        <input
          type="text"
          placeholder="Contoh: Apa itu machine learning?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          style={{
            padding: "0.75rem 1rem",
            width: "100%",
            borderRadius: "0.5rem",
            border: "1px solid #cbd5e1",
            fontSize: "1rem",
            marginBottom: "1rem",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#93c5fd" : "#3b82f6",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = "#2563eb";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = "#3b82f6";
          }}
        >
          {loading ? "Menjawab..." : "Tanya"}
        </button>

        {response && (
          <div
            style={{
              marginTop: "1.5rem",
              background: "#f1f5f9",
              padding: "1rem",
              borderRadius: "0.5rem",
              color: "#0f172a",
            }}
          >
            <strong>Jawaban:</strong>
            <p style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
              {response.message || response.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
            }
              
