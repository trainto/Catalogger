'use strict'

import React from 'react'
import {Button, Glyphicon, form, Checkbox} from 'react-bootstrap'
import {dispatcher} from '../dispatcher'
import './styles/header.css'
import '../../vendor/bootstrap/css/bootstrap.min.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false
    };
  }

  render() {
    let isStarted = this.state.isStarted;
    return (
      <div id="header" onDoubleClick={dispatcher.onDoubleClickHeader}>
        <div id="command-buttons">
          <Button onClick={dispatcher.onClickStart} disabled={isStarted}>
            <Glyphicon glyph="play"/>
          </Button>
          <Button onClick={dispatcher.onClickStop} disabled={!isStarted}>
            <Glyphicon glyph="stop"/>
          </Button>
          <Button onClick={dispatcher.onClickClear}>
            <Glyphicon glyph="trash"/>
          </Button>
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
