'use strict'

const pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;

const spawn = require('child_process').spawn;
const rl = require('readline');

process.on('message', (device) => {
  let data = [];
  // require('child_process').exec('adb', ['-s', device, 'logcat', '-c']);
  const logcat = spawn('adb', ['-s', device, 'logcat']);
  rl.createInterface({
    input: logcat.stdout,
    terminal: false
  }).on('line', (line) => {
    let match = pattern.exec(line);
    if (match) {
      data.push({
        time: match[1] + " " + match[2],
        pid: match[3],
        tid: match[4],
        level: match[5],
        tag: match[6],
        message: match[8]
      });
    }
  });

  const interval = setInterval(() => {
    if (data.length !== 0) {
      process.send(data);
      data = [];
    }
  }, 1500);
});
