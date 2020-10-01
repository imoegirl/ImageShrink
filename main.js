const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

process.env.NODE_ENV = "development";
// process.env.NODE_ENV = "production";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

const menuTemplate = [
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click: createAboutWindow,
      },
    ],
  },
];

let mainWindow;
let aboutWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: "./assets/icons/coffee_256.png",
    resizable: isDev ? true : false,
    backgroundColor: "#FFFFFF",
  });

  //   mainWindow.loadURL("https://imoegirl.com");
  //   mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: "./assets/icons/coffee_256.png",
    resizable: false,
    backgroundColor: "#FFFFFF",
  });

  aboutWindow.setMenuBarVisibility(false);

  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);

  // globalShortcut.register("CmdOrCtrl+R", () => {
  //   mainWindow.reload();
  // });

  // globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () => {
  //   mainWindow.toggleDevTools();
  // });

  mainWindow.setMenu(menu);

  mainWindow.on("ready", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length == 0) {
    createMainWindow();
  }
});
