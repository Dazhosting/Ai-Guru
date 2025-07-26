import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse("❌ Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Chat AI Guru</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Tanyakan sesuatu..."
        style={{ width: "300px", padding: "0.5rem" }}
      />
      <button onClick={handleAsk} disabled={loading} style={{ marginLeft: "1rem" }}>
        {loading ? "Memproses..." : "Tanya"}
      </button>
      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>
          <strong>Jawaban:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
