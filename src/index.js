"use strict";

const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell;
const fs = require('fs');

const alertMessage = 'No such file or directory';
const enter = 'Enter'
const escape = 'Escape'
const keydown = 'keydown'
const esc_key_down = 'esc_key_down'

let open_btn;
let path;
let open_path;
let directory_path;
let downed_key;
let result;

const outputAlert = () => {
  document.getElementsByClassName('alertarea')[0].innerHTML = alertMessage;
}

const currentWindowClose = () => {
  ipcRenderer.send('window_close');
}

const openDirectoryPath = open_path => {
  if (shell.showItemInFolder(open_path)) {
    currentWindowClose();
  } else {
    outputAlert();
  }
}

const replaceSeparatorForMac = value => {
  path = value.replace(/\\|¥/g, '/').replace(/\/\/[^\/]*/, '/Volumes').replace(/^G:|^g:/, '/Volumes/GoogleDrive').replace(/^[a-zA-Z]:/, '/Volumes');
  if (fs.existsSync(path)) {
    openDirectoryPath(path);
  } else {
    outputAlert();
  }
}

open_btn = document.getElementById('open_btn');
directory_path = document.getElementById('directory_path')
open_btn.addEventListener('click', function() {
  replaceSeparatorForMac(directory_path.value);
});

document.addEventListener(keydown, function(){
  downed_key = event.key;
  if (downed_key === escape){
    ipcRenderer.send(esc_key_down);
  }
});

const enterKeyDown = key_code => {
	if(key_code === enter) {
    replaceSeparatorForMac(directory_path.value);
	}
}
