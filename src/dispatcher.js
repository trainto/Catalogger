'use strict'

import ADBWrapper from './adb/adbwrapper'
import {dataWrapper} from './datawrapper'

class Dispatcher {
  constructor() {
    this.adbWrapper = undefined;
  }

  setLogTable(table) {
    this.logTable = table;
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


  /* ===========================================================================
  From Pane
  ============================================================================*/
  onQuickFilterChanged(event) {
    // this.logTable.onQuickFilterChanged.call(this.logTable, event.target.value);

    dataWrapper.changeFilter(new Map().set('quick', event.target.value));
    this.logTable.resetData.call(this.logTable);
  }
}

export const dispatcher = new Dispatcher();
