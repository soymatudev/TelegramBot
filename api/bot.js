export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const body = req.body;

  // Validar que venga algo válido de Telegram
  const chatId = body?.message?.chat?.id;
  const text = body?.message?.text;

  if (!chatId || !text) {
    return res.status(200).json({ ok: true }); // Silenciosamente ignorar
  }

  // Enviar respuesta al usuario desde Telegram
  const BOT_TOKEN = "8024363859:AAE0AI1EXq7jGcrjeih170mPgEsd60Xg8vo";
  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(TELEGRAM_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `🤖 Recibí tu mensaje: "${text}"`,
    }),
  });

  // Retornar éxito
  res.status(200).json({ ok: true });
}

// curl -X GET "https://api.telegram.org/bot8024363859:AAE0AI1EXq7jGcrjeih170mPgEsd60Xg8vo/setWebhook?url=https://telegram-bot-seven-pi.vercel.app/api/bot"
