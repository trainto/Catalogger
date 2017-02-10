'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

(function() {
  ReactDOM.render(<App />, document.getElementById('app'));

  document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault();
  }
})();
