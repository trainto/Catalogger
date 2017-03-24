'use strict';

import React from 'react';
import Header from './header';
import Pane from './pane';
import LogTable from './logtable';
import {dispatcher} from '../dispatcher';
import './styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Header ref={(header) => dispatcher.setHeader(header)}/>
        <div id="middle" style={{height: '100%'}}>
          <Pane />
          <LogTable ref={(logtable) => dispatcher.setLogTable(logtable)}/>
        </div>
      </div>
    );
  }
}

export default App;
