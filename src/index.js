"use strict";

const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell;
const fs = require('fs');

const alertMessage = 'No such file or directory';

let open_btn;
let open_path;
let directory_path;
let downed_key;
let result;

function outputAlert() {
  document.getElementsByClassName('alertarea')[0].innerHTML = alertMessage;
}

function currentWindowClose() {
  ipcRenderer.send('window_close');
}

function currentWindowMinimize() {
  ipcRenderer.send('window_minimize');
}

function openDirectoryPath(open_path) {
  if (fs.statSync(open_path).isDirectory()) {
    result = shell.showItemInFolder(open_path);
    if (result) {
      currentWindowClose();
    } else {
      outputAlert();
    }
  } else {
    result = shell.openItem(open_path);
    if (result) {
      currentWindowClose();
    } else {
      outputAlert();
    }
  }
}

function replaceSeparatorForMac(value) {
  open_path = value.replace(/\\|¥/g, '/').replace(/\/\/[^\/]*/, '/Volumes').replace(/^G:|^g:/, '/Volumes/GoogleDrive').replace(/^[a-zA-Z]:/, '/Volumes');
  if (fs.existsSync(open_path)) {
    openDirectoryPath(open_path);
  } else {
    outputAlert();
  }
}

function replaceSeparatorForWin(value) {
  open_path = value.replace(/\//g, '\\').replace('smb:', '');
  openDirectoryPath(open_path);
}

open_btn = document.getElementById('open_btn');
directory_path = document.getElementById('directory_path')
open_btn.addEventListener('click', function() {
  if (process.platform === 'darwin') {
    replaceSeparatorForMac(directory_path.value);
  } else {
    replaceSeparatorForWin(directory_path.value);
  }
});

document.addEventListener('keydown', function(){
  downed_key = event.key
  if (downed_key === 'Escape'){
    ipcRenderer.send('esc_key_down')
  }
});

function enterKeyDown(key_code) {
	if(key_code === 'Enter') {
    if (process.platform === 'darwin') {
      replaceSeparatorForMac(directory_path.value);
    } else {
      replaceSeparatorForWin(directory_path.value);
    }
	}
}
