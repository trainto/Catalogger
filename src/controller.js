'use strict';

var ADBWrapper = require('./adbwrapper');

function Controller() {
  this.selectedDevice = '',
  this.adbWrapper = null,
  this.isLogActive = false,
  this.isLogPaused = false
}


Controller.prototype.activateLogcat = function (device) {
  $('#logContentTable > tbody > tr').remove();
  this.adbWrapper.activateLogcat(device, function (data) {
    $("#logContentTable > tbody:last").append(data);
    $('#logContentTableWrapper').scrollTop($('#logContentTableWrapper').
        prop('scrollHeight'));
  });
  this.isLogActive = true;

  $('#stopBtn').removeAttr('disabled');
  $('#pauseResumeBtn').removeAttr('disabled');
}

Controller.prototype.init = function () {
  this.adbWrapper = new ADBWrapper();
  var that = this;

  function setOnDevices() {
    $('#dropdownDevices > li').each(function (i) {
      $(this).click(function () {
        that.selectedDevice = $(this).children('a').text();
        $('#dropdownDevicesBtn')[0].innerHTML =
            that.selectedDevice.slice(0, 7) + ' <span class="caret"></span>';
        that.activateLogcat(that.selectedDevice);
      })
    });
  }


  /* Set buttons' event listeners
   * ===========================================================================
   */
  $('#dropdownDevicesBtn').click(function () {
    that.adbWrapper.getDevices(function (devices) {
      if (devices) {
        var innerHTMLForDevices = '';
        for (var device in devices) {
          innerHTMLForDevices += "<li><a href=\"#\">" +
            devices[device] + "</a></li>";
        }
      } else {
        innerHTMLForDevices = '';
      }
      $('#dropdownDevices')[0].innerHTML = innerHTMLForDevices;
      if (innerHTMLForDevices) setOnDevices();
    });
  });

  $('#startBtn').click(function () {
    that.activateLogcat(that.selectedDevice);
    $('#startBtn').attr("disabled", "disabled");
    that.isLogActive = true;
  });

  $('#stopBtn').click(function () {
    that.adbWrapper.deActivateLogcat();
    that.isLogActive = false;
    $('#stopBtn').attr("disabled", "disabled");
    $('#startBtn').removeAttr("disabled");
    $('#pauseResumeBtn').attr("disabled", "disabled");
  });

  $('#pauseResumeBtn').click(function () {

  });

  $('#chkBoxI, #chkBoxV, #chkBoxD, #chkBoxW, #chkBoxE, #chkBoxF').click(
    function () {
      var level = $(this).text().trim();
      var styleId = 'logLevel' + level;
      var className = '.log-level-' + level.toLocaleLowerCase();
      var status = !$(this).hasClass('active');

      if (status) {
        $('#' + styleId).remove();
      } else {
        $('<style id="' + styleId + '">' + className + ' { display: none; }</style>').appendTo('head');
      }
    }
  );


  /* set log table resizable
   * ===========================================================================
   */
  $('#logContentHeader').colResizable({
    onResize: function (e) {
      var headerCols = $(e.currentTarget).find("th");
      var contentCols = $('#logContentTable').find("th");
      for (var i = 0; i < 7; i++) {
        $(contentCols[i]).width($(headerCols[i]).width());
      }
    }
  });
};

module.exports = new Controller();
