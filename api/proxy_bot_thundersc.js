
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
          const response = await fetch(this.#url, {
              method: "POST",
              headers: this.#header,
              body: this.paramsFormat(),
          });

          console.log("Haciendo solicitud a:", this.#url);

          if (response.status === 500) {
              throw new Error("Error interno del servidor");
          } else if (response.status === 400) {
              console.log("Error en la solicitud:", data.error);
          } else if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          //const contentType = response.headers.get("Content-Type");
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

    const cleanBody = JSON.parse(JSON.stringify(req.body));
    console.log("Cuerpo limpio recibido:", cleanBody);

    let bridge = new Bridge(uu, cc, "API_bot.APIService.API", cleanBody);
    let response = await bridge.databriged();
    response
      .then(response => response.json())
      .then((data) => {
        if(data.event > 0) {
          console.log("Error desde API:", data.result);
        } else {
          console.log("Respuesta exitosa:", "simon");
        }
        console.log("Saliendo de la función handler");
        return res.status(200).json({ ok: true });
      });

      return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return res.status(500).json({ error: "Falla interna del servidor" });
  }
}
