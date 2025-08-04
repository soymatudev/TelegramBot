import Bridge from "Bridge";

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const body = req.body;

  let bridge = new Bridge(uu, cc, "APIService", req.body);
  let response = await bridge.databriged();

  response
    .then((response) => response.json())
    .then((data) => {
      if (data.event > 0) {
        alert("Error: " + data.result);
      } else {
      }
    });

  // Retornar éxito
  //res.status(200).json({ ok: true });
  return res.status(200).json({ ok: true });
}
