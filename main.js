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

const createWindow = (width) => {
  const WIN = new BrowserWindow({
    width: width,
    height: 96,
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
  // WIN.webContents.openDevTools();

  WIN.setIgnoreMouseEvents(true);
  WIN.loadFile("index.html").then(() => false);
};

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const {width} = primaryDisplay.workAreaSize

  const displays = screen.getAllDisplays()

  console.log(displays)

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

  createWindow(width)
  createWindow(width)
});
