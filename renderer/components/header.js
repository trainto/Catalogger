'use strict'

import React from 'react'
import {Button, Glyphicon, form, Checkbox, Dropdown, MenuItem} from 'react-bootstrap'
import {dispatcher} from '../dispatcher'
import './styles/header.css'
import '../../vendor/bootstrap/css/bootstrap.min.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      isLoading: false,
      selectedDevice: undefined,
      textForDeviceDropdown: 'No devices',
      deviceList: []
    };
  }

  _createDeviceList(event) {
    if (event === true) {
      dispatcher.getDevices((devices) => {
        if (devices && devices.length !== 0) {
          this.setState({
            textForDeviceDropdown: 'Select a device'
          });

          let items = [];
          for (let i = 0; i < devices.length; i++) {
            items.push(<MenuItem eventKey={i}>{devices[i]}</MenuItem>);
          }
          this.setState({
            deviceList: items
          })
        } else {
          this.setState({
            selectedDevice: undefined,
            textForDeviceDropdown: 'No devices',
            deviceList: []
          });
        }
      });
    }
  }

  _selectDevice(selected) {
    let device = this.state.deviceList[selected].props.children;
    this.setState({
      selectedDevice: device
    });
    dispatcher.focusToLogTable();
  }

  getSelectedDevice() {
    return this.state.selectedDevice;
  }

  render() {
    let isStarted = this.state.isStarted;
    let isLoading = this.state.isLoading;
    return (
      <div id="header" onDoubleClick={dispatcher.onDoubleClickHeader}>
        <div id="command-buttons" onDoubleClick={(event) => {event.preventDefault()}}>
          <Button onClick={dispatcher.onClickClear}>
            <Glyphicon glyph="trash"/>
          </Button>
          <Button onClick={dispatcher.onClickStartStop} disabled={isLoading}>
            {isLoading ? <Glyphicon glyph="hourglass"/> : (isStarted ? <Glyphicon bsSize="large"glyph="stop"/> : <Glyphicon glyph="play"/>)}
          </Button>
          <Dropdown id="dropdown-devices" disabled={isStarted} onToggle={(event) => this._createDeviceList(event)} onSelect={(event) => this._selectDevice(event)}>
            <Dropdown.Toggle>{this.state.selectedDevice ? this.state.selectedDevice : this.state.textForDeviceDropdown}</Dropdown.Toggle>
            <Dropdown.Menu>
              {[this.state.deviceList]}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div id="autoscroll">
          <form>
            <Checkbox onChange={dispatcher.onAutoscrollChanged}>
              Auto scroll
            </Checkbox>
          </form>
        </div>
      </div>
    );
  }
}

export default Header
