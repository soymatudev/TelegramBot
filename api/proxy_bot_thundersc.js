
class Bridge{
  #usu; #com; #url; #param; #header; #ff;

  constructor(uu, cc, url, pp = [''], hh = {'Content-Type': 'application/json'}){
      this.#usu = uu;
      this.#com = cc;
      this.#url = url;
      this.#param = pp;
      this.#header = hh;
      this.urlFormat();
  }

  async databriged(){
      try {
          console.log("Haciendo solicitud a:", this.#url);

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos

          const response = await fetch(this.#url, {
              method: "POST",
              headers: this.#header,
              body: this.paramsFormat(),
              signal: controller.signal
          });
          clearTimeout(timeout); // Limpiar el timeout si la solicitud fue exitosa

          if (response.status === 500) {
              throw new Error("Error interno del servidor");
          } else if (response.status === 400) {
              console.log("Error en la solicitud:", data.error);
          } else if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response;
      } catch (error) {
          console.log(error);
          throw new Error("Error al realizar la solicitud: " + error.message);
      }
  } 

  paramsFormat(){
      let param = JSON.stringify({
          function: this.#ff,
          args: this.#param,
          uu: this.#usu,
          cc: this.#com
      });      

      return param;
  }

  urlFormat(){
      // Ejemplo: System.Inventario.Catalogos.Articulos.getArticulos
      let url = this.#url.split(".");
      this.#ff = url.pop();
      this.#url = "http://nexthwd.pcz.com.mx:4480/thundersc/thundercloud/" + url.join("/") + ".php";
  }

  async downloadEvent(response) {
      // Si el contenido es un archivo descargable, descárgalo directamente
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.headers
      .get("Content-Disposition")
      .split("filename=")[1]
      .replace(/\"/g, "");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const uu = "bot_telegram";
    const cc = "pcz"; // Ajusta a lo que corresponda

    const cleanBody = JSON.parse(JSON.stringify(req.body, null, 2));
    console.log("Cuerpo limpio recibido:", cleanBody);


    if (!cleanBody || Object.keys(cleanBody).length === 0) {
      console.error("Cuerpo vacío o inválido recibido");
      return res.status(400).json({ error: "Cuerpo vacío o inválido" });
    }

    let bridge = new Bridge(uu, cc, "API_bot.APIService.API", cleanBody);
    let response = await bridge.databriged();

    if (!response) {
      console.error("No hubo respuesta del servidor");
      return res.status(502).json({ error: "Sin respuesta del servidor destino" });
    }

    const data = await response.json();

    if(data.event > 0) {
      console.log("Error desde API:", data.result);
      return res.status(500).json({ error: data.result });
    } else {
      console.log("Respuesta exitosa:", "simon");
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return res.status(200).json({ error: "Falla interna del servidor" });
  }
}
