const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const APP_ID = "com.undogmatic.builderslab";
let mainWindow = null;

app.setAppUserModelId(APP_ID);

process.on("uncaughtException", (error) => console.error("[builders-lab] uncaught", error));
process.on("unhandledRejection", (error) => console.error("[builders-lab] rejected", error));

function createWindow() {
  console.log("[builders-lab] creating main window");
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 390,
    minHeight: 680,
    backgroundColor: "#0b0d0c",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "..", "build", "icon.png"),
    title: "Undogmatic Builders Lab",
    show: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });

  mainWindow.webContents.on("did-finish-load", () => console.log("[builders-lab] interface loaded"));
  mainWindow.webContents.on("did-fail-load", (_event, code, description) => {
    console.error("[builders-lab] interface failed", code, description);
  });
  void mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html")).catch((error) => {
    console.error("[builders-lab] loadFile failed", error);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("file://")) event.preventDefault();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  console.log("[builders-lab] app ready");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
