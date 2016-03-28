'use strict';

function ADBWrapper() {}

ADBWrapper.prototype.getDevices = function (callback) {
  const exec = require('child_process').exec;
  exec('adb devices', function(error, stdout, stderr) {
    var deviceList = String(stdout).split('\n');
    if (deviceList) {
      var devices = [];
      for (var i = 1; i < deviceList.length; i++) {
        if (deviceList[i].trim().endsWith('device')) {
          var device = deviceList[i].slice(0, deviceList[i].indexOf('\t'));
          devices.push(device);
        }
      }
      callback(devices);
    }
    callback(null);

  });
}

module.exports = ADBWrapper;
