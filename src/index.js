"use strict";

const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell;
const fs = require('fs');

const alertMessage = 'No such file or directory';
const enter = 'Enter';
const escape = 'Escape';
const keydown = 'keydown';
const escKeyDown = 'esc_key_down';

let openButton;
let tempPath;
let pathForMac;
let pathToVolumes;
let patternForMac;
let patternForVolumes;
let patternForGoogledrive;
let patternForOtherdrive;
let pathResult;
let inputPath;
let downedKey;

const outputAlert = () => {
  document.getElementsByClassName('alertArea')[0].innerHTML = alertMessage;
}

const currentWindowClose = () => {
  ipcRenderer.send('window_close');
}

const openDirectoryPath = path => {
  if (shell.showItemInFolder(path)) {
    currentWindowClose();
  } else {
    outputAlert();
  }
}

const replaceSeparatorForMac = path => {
  patternForMac = new RegExp(/\\|¥/, 'g');
  return path.replace(patternForMac, '/');
}

const formatForGoogleDrive = path => {
  patternForGoogledrive = new RegExp(/^G:|^g:|^\/\/G:|^\/\/g:/);
  return pathForMac.replace(patternForGoogledrive, '/Volumes/GoogleDrive');
}

const formatForNetworkDrive = path => {
  patternForVolumes = new RegExp(/\/\/[^\/]*/);
  pathToVolumes = path.replace(patternForVolumes, '/Volumes');

  patternForOtherdrive = new RegExp(/^[a-zA-Z]:/);
  return pathToVolumes.replace(patternForOtherdrive, '/Volumes');
}

const formatPathForMac = path => {
  tempPath = replaceSeparatorForMac(path);

  if (fs.existsSync('/Volumes/GoogleDrive')) {
    tempPath = formatForGoogleDrive(tempPath);
  }

  pathResult = formatForNetworkDrive(tempPath);

  if (fs.existsSync(pathResult)) {
    openDirectoryPath(pathResult);
  } else {
    outputAlert();
  }
}

openButton = document.getElementById('openButton');
inputPath = document.getElementById('inputPath')
openButton.addEventListener('click', function() {
  formatPathForMac(inputPath.value);
});

document.addEventListener(keydown, function(){
  downedKey = event.key;
  if (downedKey === escape){
    ipcRenderer.send(escKeyDown);
  }
});

const enterKeyDown = key_code => {
	if(key_code === enter) {
    formatPathForMac(inputPath.value);
	}
}
