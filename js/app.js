const { ipcRenderer } = require("electron");

ipcRenderer.send("chiediNote");

ipcRenderer.on("riceviNote", (event, arg) => {
  let note = document.getElementById("note");
  arg.forEach((nota) => {
    elementoNota = document.createElement("div");
    elementoNota.setAttribute("class", "nota");

    elementoTesto = document.createElement("p");
    elementoTesto.setAttribute("class", "testo");
    elementoTesto.innerHTML = nota.testo;

    elementoCanc = document.createElement("div");
    elementoCanc.setAttribute("class", "canc");
    elementoCanc.setAttribute("onclick", `eliminaNota(${nota.id})`);
    elementoCanc.textContent = "";

    elementoNota.appendChild(elementoTesto);
    elementoNota.appendChild(elementoCanc);

    note.appendChild(elementoNota);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let conf = document.getElementById("conf");
  let nuovoTesto = document.getElementById("nuovoTesto");

  conf.addEventListener("click", () => {
    ipcRenderer.send("nuovaNota", nuovoTesto.value);
  });
});

function eliminaNota(id) {
  ipcRenderer.send("eliminaNota", id);
}
