"use strict";

const electron = require('electron');
const dialog = electron.dialog;
const Gate = {
  label: 'Gate',
  submenu:[
    {
      label: 'About Gate',
      accelerator: 'CmdOrCtrl+Shift+A',
      click: function() { showAboutDialog(); }
    },
    { type: 'separator'},
    {
      label: 'Quit Gate',
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
    message: 'Gate',
    detail: 'Version 1.0.0'
  });
}

module.exports = [Gate, Edit, View];
