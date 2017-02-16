'use strict'

import ADBWrapper from './adb/adbwrapper'
import {dataWrapper} from './datawrapper'

class Dispatcher {
  constructor() {
    this.adbWrapper = undefined;
    this.filterTimer = undefined;
  }

  setLogTable(table) {
    this.logTable = table;
  }

  focusToLogTable() {
    const logtableDiv = document.getElementById("logtable");
    const savedTabIndex = logtableDiv.getAttribute('tabindex');
    logtableDiv.setAttribute('tabindex', '-1');
    logtableDiv.focus();
    logtableDiv.setAttribute('tabindex', savedTabIndex);
  }

  /* ===========================================================================
  From Header
  ============================================================================*/
  onClickStart() {
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
      } else if (devcies.length > 1) {

      } else {

      }
    });
  }

  onClickStop() {
    if (this.adbWrapper !== undefined) {
      this.adbWrapper.stopAdbLogcat();
    }
    this.focusToLogTable();
  }

  onClickClear() {
    this.logTable.clearTable.call(this.logTable);
  }

  onAutoscrollChanged(event) {
    this.logTable.setAutoScroll(event.target.checked);
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
