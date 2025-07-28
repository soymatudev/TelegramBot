export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { chat_id, message } = req.body;

  if (!chat_id || !message) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros: chat_id y message" });
  }

  const BOT_TOKEN = "AQUI_TU_TOKEN_DEL_BOT";
  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(TELEGRAM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text: message,
      }),
    });

    const data = await response.json();
    res.status(200).json({ success: true, telegram_response: data });
  } catch (err) {
    res
      .status(500)
      .json({ error: "No se pudo enviar el mensaje", details: err.message });
  }
}
