const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");

const PATH = require("path");

const PATH_TO_ICON = "./assets/icon.ico";
const PATH_TO_TRAY_ICON = "./assets/christmas-lights-32.ico";

let tray = null;

const createWindow = () => {
  const WIN = new BrowserWindow({
    width: 2560,
    height: 100,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    hasShadow: false,
    movable: false,
    focusable: false,
    minimizable: false,
    icon: nativeImage.createFromPath(PATH_TO_ICON),
  });

  WIN.setIgnoreMouseEvents(true);
  WIN.loadFile("index.html").then(() => false);
};

const createWindow2 = () => {
  const WIN2 = new BrowserWindow({
    width: 2560,
    height: 100,
    x: -2560,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    hasShadow: false,
    movable: false,
    focusable: false,
    minimizable: false,
    icon: nativeImage.createFromPath(PATH_TO_ICON),
  });

  WIN2.setIgnoreMouseEvents(true);
  WIN2.loadFile("index.html").then(() => false);
};

app.whenReady().then(() => {
  tray = new Tray(PATH.join(__dirname, PATH_TO_TRAY_ICON));

  const CONTEXT_MENU = Menu.buildFromTemplate([
    {
      label: "Exit",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("lightRope");
  tray.setContextMenu(CONTEXT_MENU);

  createWindow();
  createWindow2();
});
