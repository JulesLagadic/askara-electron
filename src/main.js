const { app, ipcMain, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { dialog } = require('electron')
const fs = require('fs')
const decompress = require("decompress");
const https = require('https');
const Store = require('electron-store');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const iconPath = process.platform !== 'darwin'
      ? 'src/icons/icon.ico'
      : 'src/icons/icon.icns';

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  const store = new Store();
  const user = store.get('user');

  ipcMain.on('read-file', (event) => {
    try {
      const data = fs.readFileSync('/Users/juleslagadic/Dev/askara-files/test/test.txt', 'utf8');
      decompress("/Users/juleslagadic/Dev/askara-files/test/test.txt.zip", "/Users/juleslagadic/Dev/askara-files/test/extract")
      .then((files) => {
        dialog.showMessageBox({message:'extracted!'});
      })
      .catch((error) => {
        console.log(error);
      });

      dialog.showMessageBox({message:data});
    } catch (err) {
      console.error(err);
    }
  })

  ipcMain.on('write-file', (event) => {
    const file = fs.createWriteStream("/Users/juleslagadic/Dev/askara-files/test/test.pdf");
    const request = https.get("https://storage.googleapis.com/schlouk-map/uploads/menu/le-xx-638f25f17b9720.64699334.pdf", function(response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        dialog.showMessageBox({message:'write ok!'});
      });
    });

  });

  ipcMain.on('login', function(event,data) {
    dialog.showMessageBox({message:'logged in!'});
    mainWindow.loadURL(MAIN_DASHBOARD_WEBPACK_ENTRY);
    store.set('user',response)
  });

  // and load the index.html of the app.
  if(user.token) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  } else {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }

  const template = [];
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
