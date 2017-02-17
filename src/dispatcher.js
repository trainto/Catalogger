'use strict'

import ADBWrapper from './adb/adbwrapper'
import {dataWrapper} from './datawrapper'

class Dispatcher {
  constructor() {
    this.adbWrapper = undefined;
    this.filterTimer = undefined;

    this.header = undefined;

    this.setHeader = this.setHeader.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    this.onAutoscrollChanged = this.onAutoscrollChanged.bind(this);
  }


  _focusToLogTable() {
    const logtableDiv = document.getElementById("logtable");
    const savedTabIndex = logtableDiv.getAttribute('tabindex');
    logtableDiv.setAttribute('tabindex', '-1');
    logtableDiv.focus();
    logtableDiv.setAttribute('tabindex', savedTabIndex);
  }

  setLogTable(table) {
    this.logTable = table;
  }

  setHeader(header) {
    this.header = header;
  }


  /* ===========================================================================
  From Header
  ============================================================================*/
  onClickStart(event) {
    if (this.adbWrapper === undefined) {
      this.adbWrapper = new ADBWrapper();
    }
    const devices = this.adbWrapper.getDevices((devices) => {
      if (devices.length === 1) {
        this.logTable.clearTable();
        this.adbWrapper.startLogcat(devices[0], (data) => {
          dataWrapper.push(data);
          this.logTable.resetData();
        });
        this.header.setState({isStarted: true});
      } else if (devcies.length > 1) {

      } else {

      }
    });

    this._focusToLogTable();
  }

  onClickStop() {
    if (this.adbWrapper !== undefined) {
      this.adbWrapper.stopAdbLogcat();
    }

    this.header.setState({isStarted: false});
    this._focusToLogTable();
  }

  onClickClear() {
    this.logTable.clearTable.call(this.logTable);

    this._focusToLogTable();
  }

  onAutoscrollChanged(event) {
    this.logTable.setAutoScroll(event.target.checked);

    this._focusToLogTable();
  }

  onDoubleClickHeader(event) {
    const currentWindow = window.require('electron').remote.getCurrentWindow();
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
  }


  /* ===========================================================================
  From Pane
  ============================================================================*/
  preventEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  onQuickFilterChanged(event) {
    clearTimeout(this.filterTimer);
    const text = event.target.value;
    this.filterTimer = setTimeout(() => {
      dataWrapper.changeFilter(new Map().set('quick', text));
      this.logTable.resetData.call(this.logTable);
    }, 1000);
  }
}

export const dispatcher = new Dispatcher();
