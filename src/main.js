'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1200, height: 800, acceptFirstMouse:true});
  mainWindow.loadURL('file://' + __dirname + '/html/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
