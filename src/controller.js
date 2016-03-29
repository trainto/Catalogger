'use strict';

var ADBWrapper = require('././adbwrapper');

function Controller() {
  adbWrapper: new ADBWrapper()
}


Controller.prototype.activateDevice = function (device) {
  device = $(device).text();
  this.adbWrapper.activateDevice(device, function (data) {

    $("#logContentTable > tbody:last").append(data);
    // $("#logContentTable > tbody:last").append('<tr><td>' + data.date + '</td><td>' +
    //   data.time + '</td><td>' + data.pid + '</td><td>' + data.tid + '</td><td>' +
    //   data.level + '</td><td>' + data.tag + '</td><td>' + data.msg + '</td></tr>')
  });
}

Controller.prototype.init = function () {
  document.getElementById('dropdownDevicesBtn').addEventListener("click", function () {
    this.adbWrapper.getDevices(function (devices) {
      if (devices) {
        var innerHTMLForDevices = '';
        for (var device in devices) {
          innerHTMLForDevices += "<li onclick=\"controller.activateDevice(this.innerHTML)\"><a href=\"#\">" + devices[device] + "</a></li>";
        }
      } else {
        innerHTMLForDevices = '';
      }
      document.getElementById('dropdownDevices').innerHTML = innerHTMLForDevices;
    });
  });
};

module.exports = new Controller();
