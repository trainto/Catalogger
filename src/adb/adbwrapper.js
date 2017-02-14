'use strict'

import {exec, spawn, fork} from 'child_process'
import readline from 'readline'
import LogParser from './logparser'

class ADBWrapper {
  constructor() {
    this.logcat = undefined;
    this.adbLogcatParser = undefined;
  }

  getDevices(callback) {
    exec('adb devices', (error, stdout, stderr) => {
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

  startLogcat2(device, callback) {
    this.adbLogcatParser = fork('./src/adb/adblogcatparser.js');
    this.adbLogcatParser.on('message', (data) => {
      callback(data);
    });

    this.adbLogcatParser.on('close', (code, signal) => {
      console.log('adbwrapper.js: adbLogcatParser process killed!');
    })

    this.adbLogcatParser.send(device);
  }

  stopAdbLogcat() {
    if (this.adbLogcatParser) {
      this.adbLogcatParser.kill();
      this.adbLogcatParser = undefined;
    }
  }
}

export default ADBWrapper
