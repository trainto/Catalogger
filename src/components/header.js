'use strict'

import React from 'react'
import {Button, Glyphicon, form, Checkbox} from 'react-bootstrap'
import {dispatcher} from '../dispatcher'
import './styles/header.css'
import '../../vendor/bootstrap/css/bootstrap.min.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <div id="command-buttons">
          <Button onClick={dispatcher.onClickStart.bind(dispatcher)} data-toggle="tooltip" title="Start">
            <Glyphicon glyph="play"/>
          </Button>
          <Button onClick={dispatcher.onClickStop.bind(dispatcher)}>
            <Glyphicon glyph="stop"/>
          </Button>
          <Button onClick={dispatcher.onClickClear.bind(dispatcher)}>
            <Glyphicon glyph="trash"/>
          </Button>
        </div>
        <div id="autoscroll">
          <form>
            <Checkbox onChange={dispatcher.onAutoscrollChanged.bind(dispatcher)}>Auto scroll</Checkbox>
          </form>
        </div>
      </div>
    );
  }
}

export default Header
