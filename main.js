const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  screen,
} = require("electron");

const PATH = require("path");

const PATH_TO_ICON = "./assets/icon.ico";
const PATH_TO_TRAY_ICON = "./assets/christmas-lights-32.ico";

let tray = null;

const createWindow = ({ width, x, y }) => {
  const WIN = new BrowserWindow({
    width: width,
    height: 72,
    // height: 1024,
    x: x,
    y: y,
    frame: false,
    alwaysOnTop: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    movable: false,
    focusable: false,
    minimizable: false,
    icon: nativeImage.createFromPath(PATH_TO_ICON),
  });
  // WIN.webContents.openDevTools();

  WIN.setAlwaysOnTop(true, "screen-saver");
  WIN.setIgnoreMouseEvents(true);
  WIN.loadFile("index.html").then(() => false);

  WIN.on("hide", () => {
    WIN.setAlwaysOnTop(true, "screen-saver");
    WIN.show();
  });
};

app.whenReady().then(() => {
  const displays = screen.getAllDisplays();

  tray = new Tray(PATH.join(__dirname, PATH_TO_TRAY_ICON));

  const CONTEXT_MENU = Menu.buildFromTemplate([
    {
      label: "Закрыть",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Новогодняя гирлянда");
  tray.setContextMenu(CONTEXT_MENU);

  displays.map((display) => {
    createWindow({
      width: display.bounds.width,
      x: display.bounds.x,
      y: display.bounds.y,
    });
  });
});
