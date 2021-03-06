'use strict';

import {exec, fork} from 'child_process';
import path from 'path';

class ADBWrapper {
  constructor() {
    this.logcat = undefined;
    this.adbLogcatParser = undefined;
  }

  getDevices(callback) {
    let adbPath = path.join(__dirname, 'static');
    if (process.platform === 'darwin') {
      adbPath = path.join(adbPath, 'darwin');
    }
    exec(adbPath + '/adb devices', (error, stdout) => {
      const devices = [];
      const deviceList = stdout.toString().split('\n');
      const pattern = /(.*)\tdevice/;
      for (let device in deviceList) {
        let match = pattern.exec(deviceList[device]);
        if (match) {
          devices.push(match[1]);
        }
      }
      callback(devices);
    });
  }

  isDeviceExisted(device, callback) {
    this.getDevices((devices) => {
      for (let i = 0; i < devices.length; i++) {
        if (devices[i] === device) {
          callback();
        }
      }
    });
  }

  startLogcat(device, callback) {
    this.adbLogcatParser = fork(path.join(__dirname, 'adblogcatparser'));
    let started = false;
    this.adbLogcatParser.on('message', (data) => {
      if (data === 0) {
        this.adbLogcatParser.kill();
        callback('err');
        return;
      }
      callback('data', data);
      if (!started) {
        started = true;
        callback('start');
      }
    });

    this.adbLogcatParser.on('close', () => {
      callback('stop');
    });

    this.adbLogcatParser.send(device);
  }

  stopAdbLogcat() {
    if (this.adbLogcatParser) {
      this.adbLogcatParser.send('kill');
      setTimeout(() => {
        this.adbLogcatParser.kill();
        this.adbLogcatParser = undefined;
      }, 500);
    }
  }
}

export default ADBWrapper;
