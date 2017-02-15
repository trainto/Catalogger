'user strict'

import React from 'react'
import {form, FormGroup, InputGroup, FormControl, Glyphicon} from 'react-bootstrap'
import {dispatcher} from '../dispatcher'
import './styles/pane.css'

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='pane'>
        <form>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon><Glyphicon glyph='filter' /></InputGroup.Addon>
              <FormControl type="text" placeholder='Quick filter'
                  onChange={dispatcher.onQuickFilterChanged.bind(dispatcher)}/>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default Pane
