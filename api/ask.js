import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya metode POST yang diperbolehkan' });
  }

  const { question } = req.body;

  try {
    const response = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{
        pluginId: null,
        content: question,
        role: "user"
      }],
      prompt: "Kamu adalah seorang AI guru yang bijak, ramah, dan sabar. Jelaskan sesuatu dengan jelas, sederhana, dan penuh pengertian agar mudah dimengerti siapa pun. Gunakan bahasa Indonesia yang santai tapi tetap sopan dan profesional...",
      temperature: 0.5
    }, {
      headers: {
        Accept: "/*/",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const result = response.data;
    res.status(200).json({ result });
  } catch (error) {
    console.error("Kesalahan:", error.message);
    res.status(500).json({ error: "Gagal mengambil respons dari AI." });
  }
}
