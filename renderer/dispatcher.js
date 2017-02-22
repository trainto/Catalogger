'use strict'

import ADBWrapper from './adb/adbwrapper'
import {dataWrapper} from './datawrapper'
import LogFileParser from './adb/logfileparser'

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


  focusToLogTable() {
    const logtableDiv = document.getElementById("logtable");
    const savedTabIndex = logtableDiv.getAttribute('tabindex');
    logtableDiv.setAttribute('tabindex', '-1');
    logtableDiv.focus();
    logtableDiv.setAttribute('tabindex', savedTabIndex);
  }

  _getDeviceToStart(devices) {
    if (devices.length === 0) {
      return;
    }

    if (devices.length === 1) {
      return devices[0];
    } else {

    }
  }

  _startLogcat(device) {
    this.header.setState({
      selectedDevice: device
    });
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
        case 'err':
          this.header.setState({
            isStarted: false,
            isLoading: false,
            selectedDevice: undefined
          });
          break;
        default:
          break;
      }
    });

    this.header.setState({isLoading: true})
  }

  openFile(file) {
    const logFileParser = new LogFileParser();
    logFileParser.parseFile(file, (result) => {
      dataWrapper.push(result);
      this.logTable.resetData.call(this.logTable);
    });
  }

  setLogTable(table) {
    this.logTable = table;
  }

  setHeader(header) {
    this.header = header;
  }

  getDevices(callback) {
    this.adbWrapper.getDevices((devices) => {
      callback(devices);
    });
  }


  /* ===========================================================================
  From Header
  ============================================================================*/
  onClickStartStop(event) {
    if (!this.header.state.isStarted) {
      let device;
      if (this.header.state.selectedDevice) {
        device = this.header.state.selectedDevice;
      } else {
        this.adbWrapper.getDevices((devices) => {
          device = this._getDeviceToStart(devices);
          if (device) {
            this._startLogcat(device);
          }
        });
      }

      if (device) {
        this.adbWrapper.isDeviceExisted(device, () => {
          this._startLogcat(device);
        });
      }
    } else {
      this.adbWrapper.stopAdbLogcat();
    }

    this.focusToLogTable();
  }

  onClickClear() {
    this.logTable.clearTable.call(this.logTable);

    this.focusToLogTable();
  }

  onAutoscrollChanged(event) {
    this.logTable.setAutoScroll(event.target.checked);

    this.focusToLogTable();
  }

  onDoubleClickHeader(event) {
    if (event.target.getAttribute('id') === 'header') {
      const currentWindow =
          window.require('electron').remote.getCurrentWindow();
      if (currentWindow.isMaximized()) {
        currentWindow.unmaximize();
      } else {
        currentWindow.maximize();
      }
    }
  }


  /* ===========================================================================
  From Pane
  ============================================================================*/
  preventEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.focusToLogTable();
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


 /* ===========================================================================
  From Pane
  ============================================================================*/
  onDrop(event) {
    this.openFile(event.dataTransfer.files[0].path);
  }
}

export const dispatcher = new Dispatcher();
