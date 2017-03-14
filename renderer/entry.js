'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {dispatcher} from './dispatcher';

(function () {
  ReactDOM.render(<App />, document.getElementById('app'));

  document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault();
  };

  window.require('electron').ipcRenderer.on('file-open', (event, file) => {
    dispatcher.openFile(file);
  });
})();
