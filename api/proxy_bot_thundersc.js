import Bridge from "./Bridge.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const uu = "bot_telegram";
    const cc = "pcz"; // Ajusta a lo que corresponda
    const body = req.body;

    let bridge = new Bridge(uu, cc, "API_bot.APIService.API", body);
    const response = await bridge.databriged();

    if (!response) {
      throw new Error("No hubo respuesta del servidor");
    }

    const data = await response.json();

    if (data.event > 0) {
      console.log("Error desde API:", data.result);
    } else {
      console.log("Respuesta exitosa:", data.result);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return res.status(500).json({ error: "Falla interna del servidor" });
  }
}
