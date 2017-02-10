'user strict'

import React from 'react'
import Pane from './pane'
import LogTable from './logtable'

class Content extends React.Component {
  render() {
    return (
      <div id="middle" style={{height: '100%'}}>
        <Pane />
        <LogTable />
      </div>
    );
  }
}

export default Content
