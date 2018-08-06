"use strict";

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const dialog = electron.dialog;
const url = require('url');
const path = require('path');
const menuTemplate = [
  {
    label: 'Gate',
    submenu:[
      {
        label: 'About',
        accelerator: 'CmdOrCtrl+Shift+A',
        click: function() { showAboutDialog(); }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() { app.quit() }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
];

let mainWindow;
let open_btn;
let open_path;
let result;
let menu = Menu.buildFromTemplate(menuTemplate);

require('update-electron-app')({
  repo: 'zetton-31/Gate',
  updateInterval: '1 hour'
});

function createWindow() {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({
    width: 790,
    height:100,
    backgroundcolor: '#2b2e3b',
    frame: true,
    titleBarStyle: 'hidden',
    transparent: false
  });

  mainWindow.focus();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.setPosition(35,45);

  mainWindow.on('closed', ()=> {
    mainWindow = null;
  });
}

function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: 'About Gate',
    detail: 'This App is able to open any path.'
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('esc_key_down', function() {
  mainWindow.close();
});

ipcMain.on('window_close', function() {
  mainWindow.close();
});

ipcMain.on('window_minimize', function() {
  mainWindow.minimize();
});
