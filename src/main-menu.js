"use strict";

const electron = require('electron');
const app_info = require('./package.json');
const dialog = electron.dialog;
const Gate = {
  label: app_info.name,
  submenu:[
    {
      label: 'About ' + app_info.name,
      accelerator: 'CmdOrCtrl+Shift+A',
      click: function() { showAboutDialog(); }
    },
    { type: 'separator'},
    {
      label: 'Quit ' + app_info.name,
      role: 'quit',
      accelerator: 'CmdOrCtrl+Q',
    }
  ]
}
const Edit = {
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
}
const View = {
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
}

const showAboutDialog = () => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: app_info.name,
    detail: 'Version ' + app_info.version
  });
}

module.exports = [Gate, Edit, View];
