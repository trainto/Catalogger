'use strict';

function ADBWrapper() {
  this.spawn = require('child_process').spawn,
  this.exec = require('child_process').exec,
  this.logcat = null
}

ADBWrapper.prototype.getDevices = function (callback) {
  this.exec = require('child_process').exec;
  this.exec('adb devices', function(error, stdout, stderr) {
    var deviceList = String(stdout).split('\n');
    if (deviceList) {
      var devices = [];
      for (var i = 1; i < deviceList.length; i++) {
        if (deviceList[i].trim().endsWith('device')) {
          var device = deviceList[i].slice(0, deviceList[i].indexOf('\t'));
          devices.push(device);
        }
      }
    }
    if (devices.length >= 1) {
      callback(devices);
    } else {
      callback(null);
    }
  });
};

ADBWrapper.prototype.activateLogcat = function (device, callback) {
  var parser = require('child_process').fork('./src/logcatparser.js');
  parser.on('message', function(lines) {
    callback(lines);
  });

  this.exec('adb', ['s', device, 'logcat', '-c']);
  this.logcat = this.spawn('adb',
    ['-s', device, 'logcat', '-v', 'threadtime'],
    {detached: true});

  var lines = [];

  var readLine = require("readline");
  var rl = readLine.createInterface({
    input: this.logcat.stdout,
    terminal: false
  }).on('line', function(line) {
    if (line === "") return;
    lines.push(line);
  });

  var interval = setInterval(function () {
    if (lines.length === 0) return;
    parser.send(lines );
    lines = [];
  }, 2000);

  this.logcat.on('close', function (code, signal) {
    rl.close();
    clearInterval(interval);
    parser.kill();
  });
};

ADBWrapper.prototype.deActivateLogcat = function () {
  if (this.logcat) {
    this.logcat.kill();
    this.logcat = null;
  }
};

ADBWrapper.prototype.setFilters = function (filters) {
  this.filters = filters;
};

module.exports = ADBWrapper;
