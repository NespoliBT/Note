const { app, BrowserWindow, ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/data/Database.db");
require("electron-reload")(__dirname);

let win;

db.run(`
    CREATE TABLE IF NOT EXISTS note (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      testo TEXT
    )
`);

ipcMain.on("nuovaNota", (event, arg) => {
  let testo = arg.replace(/\n/g, "<br/>");
  console.log(testo);

  db.run(`INSERT INTO note(testo) VALUES(?)`, [testo], function (err) {
    if (err) {
      console.log(err.message);
    }

    console.log(`Nota creata [${this.lastID}]`);
  });
});

ipcMain.on("chiediNote", (event) => {
  db.all("SELECT * FROM note", function (err, note) {
    event.reply("riceviNote", note);
  });
});

ipcMain.on("eliminaNota", (event, arg) => {
  db.run(`DELETE FROM note WHERE id=?`, arg, function (err) {
    if (err) {
      console.log(err.message);
    }

    console.log(`Note eliminata [${this.lastID}]`);
  });
});

function createWindow() {
  // Create the browser window.

  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
