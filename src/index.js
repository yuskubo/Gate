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
let path_for_mac;
let path_to_volumes;
let path_for_googledrive;
let pattern_for_mac;
let pattern_for_volumes;
let pattern_for_googledrive;
let pattern_for_otherdrive;
let path_result;
let open_path;
let directory_path;
let downed_key;

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
  pattern_for_mac = new RegExp(/\\|¥/, 'g');
  path_for_mac = value.replace(pattern_for_mac, '/');

  if (fs.existsSync('/Volumes/GoogleDrive')) {
    pattern_for_googledrive = new RegExp(/^G:|^g:|^\/\/G:|^\/\/g:/);
    path_for_googledrive = path_for_mac.replace(pattern_for_googledrive, '/Volumes/GoogleDrive');

    pattern_for_volumes = new RegExp(/\/\/[^\/]*/);
    path_to_volumes = path_for_googledrive.replace(pattern_for_volumes, '/Volumes');

    pattern_for_otherdrive = new RegExp(/^[a-zA-Z]:/);
    path_result = path_to_volumes.replace(pattern_for_otherdrive, '/Volumes');
  } else {
    pattern_for_volumes = new RegExp(/\/\/[^\/]*/);
    path_to_volumes = path_for_mac.replace(pattern_for_volumes, '/Volumes');

    pattern_for_otherdrive = new RegExp(/^[a-zA-Z]:/);
    path_result = path_to_volumes.replace(pattern_for_otherdrive, '/Volumes');
  }

  if (fs.existsSync(path_result)) {
    openDirectoryPath(path_result);
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
