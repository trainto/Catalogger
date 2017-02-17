'user strict'

import React from 'react'
import {form, FormGroup, InputGroup, FormControl, Glyphicon, Checkbox} from 'react-bootstrap'
import {dispatcher} from '../dispatcher'
import './styles/pane.css'

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='pane'>
        <div>
          <form>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  <Glyphicon glyph='filter' />
                </InputGroup.Addon>
                <FormControl type="text" placeholder='Quick filter'
                    onChange={dispatcher.onQuickFilterChanged.bind(dispatcher)}
                    onKeyPress={dispatcher.preventEnter.bind(dispatcher)}/>
              </InputGroup>
            </FormGroup>
          </form>
        </div>
        <div id='filter-level'>
          <form>
            <Checkbox onChange={
              (event) => dispatcher.onFilterChanged('V', event.target.checked)
            }>
              Verbose
            </Checkbox>
            <Checkbox className='checkbox-stacked' onChange={
              (event) => dispatcher.onFilterChanged('D', event.target.checked)
            }>
              Debug
            </Checkbox>
            <Checkbox className='checkbox-stacked' onChange={
              (event) => dispatcher.onFilterChanged('I', event.target.checked)
            }>
              Info
            </Checkbox>
            <Checkbox className='checkbox-stacked' onChange={
              (event) => dispatcher.onFilterChanged('W', event.target.checked)
            }>
              Warn
            </Checkbox>
            <Checkbox className='checkbox-stacked' onChange={
              (event) => dispatcher.onFilterChanged('E', event.target.checked)
            }>
              Error
            </Checkbox>
          </form>
        </div>
      </div>
    )
  }
}

export default Pane
