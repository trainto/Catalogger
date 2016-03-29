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
    }
    if (devices.length >= 1) {
      callback(devices);
    } else {
      callback(null);
    }
  });
};

ADBWrapper.prototype.activateDevice = function (device, document, callback) {
  const spawn = require('child_process').spawn;
  const parser = require('child_process').fork('./src/logcatparser.js');
  const readLine = require('readline');
  const logcat = spawn('adb', ['-s', device, 'logcat']);
  var resultLines = [];
  parser.on('message', function(line) {
    console.log("Add line");
    var table = document.getElementById("logContentTable");
    $('table > tbody:last').append(line);
  });
  readLine.createInterface({
    input: logcat.stdout,
    terminal: false
  }).on('line', function(line) {
    if (line === "") return;
    parser.send(line);
    // var pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)\s+(.*)/;
    // var match = pattern.exec(line);
    // if (!match) return;
    // var data = {
    //   date: match[1].trim(),
    //   time: match[2].trim(),
    //   pid: match[3].trim(),
    //   tid: match[4].trim(),
    //   level: match[5].trim(),
    //   tag: match[6].trim(),
    //   msg: match[7].trim()
    // };
    // var retStr = '<tr><td>' + data.date + '</td><td>' +
    //   data.time + '</td><td>' + data.pid + '</td><td>' + data.tid + '</td><td>' +
    //   data.level + '</td><td>' + data.tag + '</td><td>' + data.msg + '</td></tr>';
    // resultLines.push(retStr);
    // callback(retStr);
  });


  // setInterval(function () {
  //   console.log("interval executed! - " + resultLines.length);
  //   var table = document.getElementById("logContentTable");
  //   for (var i in resultLines) {
  //     $('table > tbody:last').append(resultLines[i]);
  //   }
  //   resultLines = [];
  // }, 1000);
};

module.exports = ADBWrapper;
