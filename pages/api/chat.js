const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { text } = req.body;

  try {
    const response = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4",
      },
      messages: [
        {
          pluginId: null,
          content: text,
          role: "user",
        },
      ],
      prompt:
        "Kamu adalah seorang AI guru yang bijak, ramah, dan sabar. Jelaskan sesuatu dengan jelas, sederhana, dan penuh pengertian agar mudah dimengerti siapa pun. Gunakan bahasa Indonesia yang santai tapi tetap sopan dan profesional. Kamu juga bersikap seperti mentor yang selalu mendukung dan memberikan semangat kepada pengguna. Jika perlu, gunakan analogi sederhana atau contoh agar penjelasan lebih mudah dipahami. Jangan terdengar seperti robot, tapi tetap fokus pada membantu secara informatif dan positif.",
      temperature: 0.5,
    }, {
      headers: {
        Accept: "/*/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      },
    });

    res.status(200).json({ message: response.data?.choices?.[0]?.message?.content || "Tidak ada jawaban." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil respons." });
  }
}
