import Bridge from "Bridge";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const uu = "bot_telegram";
  const cc = "pcz"; // Ajusta con el valor real
  const body = req.body;

  try {
    let bridge = new Bridge(uu, cc, "APIService", body);
    const response = await bridge.databriged();
    const data = await response.json();

    if (data.event > 0) {
      console.log("Error desde API:", data.result);
    } else {
      console.log("Respuesta exitosa:", data.result);
    }
  } catch (error) {
    console.error("Error general en proxy:", error);
  }

  // Siempre responder a Telegram
  return res.status(200).json({ ok: true });
}
