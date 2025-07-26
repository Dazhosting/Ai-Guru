import { useState } from "react";

// Definisikan semua gaya sebagai objek JavaScript
const styles = {
  // Variabel warna
  colors: {
    backgroundColor: '#f0f4f8',
    cardBackground: '#ffffff',
    primaryColor: '#4a90e2',
    textColor: '#333333',
    lightTextColor: '#777777',
    aiBubbleBg: '#e9f5ff',
    errorBubbleBg: '#ffebee',
    errorTextColor: '#c62828',
    borderColor: '#e0e0e0',
  },
  // Gaya utama
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8', // Menggunakan warna dari objek
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '1rem',
  },
  chatCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e0e0e0',
  },
  headerH1: {
    margin: 0,
    color: '#333333',
    fontSize: '1.75rem',
  },
  headerP: {
    margin: '0.25rem 0 0',
    color: '#777777',
  },
  responseArea: {
    padding: '1rem 2rem',
    flexGrow: 1,
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chatBubble: {
    padding: '1rem 1.5rem',
    borderRadius: '20px',
    maxWidth: '85%',
    lineHeight: 1.5,
    whiteSpace: 'pre-line',
    marginBottom: '1rem',
  },
  aiBubble: {
    backgroundColor: '#e9f5ff',
    color: '#333333',
    borderBottomLeftRadius: '4px',
    alignSelf: 'flex-start',
  },
  errorBubble: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    alignSelf: 'flex-start',
  },
  typingIndicator: {
    color: '#777777',
    fontStyle: 'italic',
    padding: '1rem 0',
  },
  form: {
    display: 'flex',
    padding: '1rem 2rem',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
  },
  input: {
    flexGrow: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    marginLeft: '0.75rem',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#b0c4de',
    cursor: 'not-allowed',
  },
  footer: {
    marginTop: '1.5rem',
    color: '#777777',
    fontSize: '0.875rem',
  }
};

// Komponen untuk ikon Send (SVG)
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.47826 2.33913L21.6609 11.4304C22.1087 11.6435 22.3391 12.087 22.3391 12.5696C22.3391 13.0522 22.1087 13.4957 21.6609 13.7087L3.47826 22.8C3.03043 23.013 2.5 22.8 2.26957 22.3565C2.03913 21.913 2.15217 21.3826 2.5 21.1696L18.0696 12.5696L2.5 4C2.15217 3.78696 2.03913 3.25652 2.26957 2.81304C2.5 2.36957 3.03043 2.12609 3.47826 2.33913Z" />
  </svg>
);

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question }),
      });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError("❌ Maaf, terjadi kesalahan saat menghubungi AI.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <main style={styles.container}>
      <div style={styles.chatCard}>
        <div style={styles.header}>
          <h1 style={styles.headerH1}>AI Guru ✨</h1>
          <p style={styles.headerP}>Tanyakan apa saja, saya akan coba menjawab!</p>
        </div>

        <div style={styles.responseArea}>
          {loading && <div style={styles.typingIndicator}>AI sedang mengetik...</div>}
          {error && <div style={{...styles.chatBubble, ...styles.errorBubble}}>{error}</div>}
          {response && <div style={{...styles.chatBubble, ...styles.aiBubble}}>{response}</div>}
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ketik pertanyaanmu di sini..."
            style={styles.input}
            disabled={loading}
          />
          <button type="submit" disabled={loading} style={{...styles.button, ...(loading && styles.buttonDisabled)}}>
            {loading ? "..." : <SendIcon />}
          </button>
        </form>
      </div>
      <footer style={styles.footer}>
        26/7/2025
      </footer>
    </main>
  );
    }
