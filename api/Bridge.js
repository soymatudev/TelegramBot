/*
===============================================================================
Autor: Juan Maturana
Fecha de Creación: 15/11/2024
===============================================================================
*/

/* 
uu = usuario
cc = compania
url = url de la funcion
pp = parametros
hh = header
*/
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
            const response = await fetch(this.#url, {
                method: "POST",
                headers: this.#header,
                body: this.paramsFormat(),
            });

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
        this.#url = "http://nexthwd.pcz.com.mx:4480/thundersc/thundercloud/API_bot/" + url.join("/") + ".php";
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

export default Bridge;