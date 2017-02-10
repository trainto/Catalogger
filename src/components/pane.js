'user strict'

import React from 'react'
import './styles/pane.css'

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="pane">
        <h1>TODO: filters</h1>
      </div>
    )
  }
}

export default Pane
