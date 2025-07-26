import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { text: question });
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>👨‍🏫 Guru AI</h1>
      <p>Tanyakan apa pun ke AI Guru yang sabar dan bijak ✨</p>
      <input
        type="text"
        placeholder="Contoh: Apa itu machine learning?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", maxWidth: "500px" }}
      />
      <br /><br />
      <button onClick={handleAsk} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
        {loading ? "Menjawab..." : "Tanya"}
      </button>
      <br /><br />
      {response && (
        <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
          <strong>Jawaban:</strong>
          <p>{response.message || response.error}</p>
        </div>
      )}
    </div>
  );
  }
        
