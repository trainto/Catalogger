'use strict'

import React from 'react'
import Header from './header'
import Content from './content'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App
