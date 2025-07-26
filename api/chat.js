const { ChatAiGuru } = require("ai-guru-xid");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Pertanyaan tidak valid." });
  }

  try {
    const jawaban = await ChatAiGuru(text);

    if (!jawaban) {
      return res.status(500).json({ error: "Jawaban tidak tersedia." });
    }

    res.status(200).json({ message: jawaban });
  } catch (err) {
    console.error("❌ Gagal mendapatkan jawaban:", err.message);
    res.status(500).json({ error: "Terjadi kesalahan saat memproses permintaan." });
  }
}
