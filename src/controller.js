'use strict';

var ADBWrapper = require('./adbwrapper');

function Controller() {
  this.adbWrapper = null,
  this.isLogActive = false,
  this.isLogPaused = false
}


Controller.prototype.activateLogcat = function (device) {
  $('#logContentTable > tbody > tr').remove();
  this.adbWrapper.activateLogcat(device, function (data) {
    $("#logContentTable > tbody:last").append(data);
    $('#logContentTableWrapper').scrollTop($('#logContentTableWrapper').prop('scrollHeight'));
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
        $('#dropdownDevicesBtn')[0].innerHTML = '<div class="button-text">' +
            $(this).children('a').text() + '<span class="caret"></span></div>';
        that.activateLogcat($(this).children('a').text());
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
    that.activateLogcat($('#dropdownDevicesBtn').text());
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
