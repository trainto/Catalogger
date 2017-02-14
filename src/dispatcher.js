'use strict'

import ADBWrapper from './adb/adbwrapper'

class Dispatcher {
  constructor() {
    this.adbWrapper = undefined;
  }

  setLogTable(table) {
    this.logTable = table;
  }

  onClickStart() {
    if (this.adbWrapper === undefined) {
      this.adbWrapper = new ADBWrapper();
    }
    const devices = this.adbWrapper.getDevices((devices) => {
      if (devices.length === 1) {
        this.logTable.clearTable.call(this.logTable);
        this.adbWrapper.startLogcat2(devices[0], (data) => {
          this.logTable.addRow(data);
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

  }

  onClickClear() {
    this.logTable.clearTable.call(this.logTable);
  }
}

export const dispatcher = new Dispatcher();
