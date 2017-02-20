'use strict'

import ADBWrapper from './adb/adbwrapper'
import {dataWrapper} from './datawrapper'

class Dispatcher {
  constructor() {
    this.adbWrapper = new ADBWrapper();

    this.setLogTable = this.setLogTable.bind(this);
    this.setHeader = this.setHeader.bind(this);

    this.onClickStartStop = this.onClickStartStop.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    this.onAutoscrollChanged = this.onAutoscrollChanged.bind(this);
    this.onDoubleClickHeader = this.onDoubleClickHeader.bind(this);

    this.preventEnter = this.preventEnter.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }


  _focusToLogTable() {
    const logtableDiv = document.getElementById("logtable");
    const savedTabIndex = logtableDiv.getAttribute('tabindex');
    logtableDiv.setAttribute('tabindex', '-1');
    logtableDiv.focus();
    logtableDiv.setAttribute('tabindex', savedTabIndex);
  }

  _getDevices(devices) {
    if (devices.length == 1) {
      return devices[0];
    }
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
  onClickStartStop(event) {
    if (!this.header.state.isStarted) {
      this.adbWrapper.getDevices((devices) => {
        const device = this._getDevices(devices);
        dataWrapper.resetData();
        this.adbWrapper.startLogcat(device, (what, data) => {
          switch (what) {
            case 'data':
              dataWrapper.push(data);
              this.logTable.resetData.call(this.logTable);
              break;
            case 'stop':
              this.header.setState({isStarted: false});
              break;
            case 'start':
              this.header.setState({
                isStarted: true,
                isLoading: false
              });
              break;
            default:
              break;
          }
        });
        this.header.setState({isLoading: true})
      });
    } else {
      this.adbWrapper.stopAdbLogcat();
    }

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
      this._focusToLogTable();
    }
  }

  onFilterChanged(filterBy, changed) {
    switch (filterBy) {
      case 'V':
      case 'W':
      case 'D':
      case 'I':
      case 'E':
        dataWrapper.changeFilter(
            new Map().set('level', [filterBy, changed]), () => {
          this.logTable.resetData.call(this.logTable);
        });
        break
      case 'quick':
      case 'pid':
      case 'tid':
      case 'tag':
      case 'message':
        dataWrapper.changeFilter(new Map().set(filterBy, changed), () => {
          this.logTable.resetData.call(this.logTable);
        });
        break;
      default:
        break;
    }
  }
}

export const dispatcher = new Dispatcher();
