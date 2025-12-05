const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  screen,
  ipcMain,
  shell,
} = require("electron");

const PATH = require("path");

const PATH_TO_ICON = "./assets/icon.ico";
const PATH_TO_TRAY_ICON = "./assets/christmas-lights-32.ico";

let tray = null;
let windows = [];

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

  WIN.setAlwaysOnTop(true, "floating");
  WIN.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  WIN.setIgnoreMouseEvents(true);
  WIN.loadFile("index.html").then(() => false);

  setInterval(() => {
    WIN.setAlwaysOnTop(true, "floating");
  }, 5000);

  windows.push(...windows, WIN);
};

app.whenReady().then(() => {
  const displays = screen.getAllDisplays();

  const primaryDisplayWidth = displays[0].bounds.width;
  const primaryDisplayHeight = displays[0].bounds.height;

  tray = new Tray(PATH.join(__dirname, PATH_TO_TRAY_ICON));

  const CONTEXT_MENU = Menu.buildFromTemplate([
    {
      label: "О приложении",
      type: "normal",
      click: () => {
        const WIN = new BrowserWindow({
          width: 384,
          height: 384,
          x: primaryDisplayWidth - 32 - 384,
          y: primaryDisplayHeight - 32 - 256,
          resizable: false,
          minimizable: false,
          transparent: true,
          hasShadow: true,
          frame: false,
          icon: nativeImage.createFromPath(PATH_TO_ICON),
          webPreferences: {
            preload: PATH.join(__dirname, "preload.js"),
          },
        });
        WIN.loadFile("about.html").then(() => false);
        windows.push(...windows, WIN);
      },
    },
    {
      label: "Скрыть",
      type: "submenu",
      submenu: [
        {
          label: "15 секунд",
          type: "normal",
          click: () => {
            windows.map((el) => {
              el.hide();
              setTimeout(() => {
                el.show();
              }, 1000 * 15);
            });
          },
        },
        {
          label: "Скрыть на 1 минуту",
          type: "normal",
          click: () => {
            windows.map((el) => {
              el.hide();
              setTimeout(() => {
                el.show();
              }, 1000 * 60);
            });
          },
        },
        {
          label: "Скрыть на 15 минут",
          type: "normal",
          click: () => {
            windows.map((el) => {
              el.hide();
              setTimeout(
                () => {
                  el.show();
                },
                1000 * 60 * 15,
              );
            });
          },
        },
        {
          label: "Скрыть на 1 час",
          type: "normal",
          click: () => {
            windows.map((el) => {
              el.hide();
              setTimeout(
                () => {
                  el.show();
                },
                1000 * 60 * 60,
              );
            });
          },
        },
        {
          label: "Скрыть на 8 часов",
          type: "normal",
          click: () => {
            windows.map((el) => {
              el.hide();
              setTimeout(
                () => {
                  el.show();
                },
                1000 * 60 * 60 * 8,
              );
            });
          },
        },
      ],
    },
    {
      type: "separator",
    },
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

ipcMain.on("close-window", (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (win) win.close();
});

ipcMain.on("open-link", (event, url) => {
  shell.openExternal(url).then(() => false);
});
