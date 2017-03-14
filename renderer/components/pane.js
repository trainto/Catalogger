'user strict';

import React from 'react';
import {form, FormGroup, InputGroup, FormControl, Glyphicon, Checkbox} from 'react-bootstrap';
import {dispatcher} from '../dispatcher';
import './styles/pane.css';

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
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('quick', event.target.value)}/>
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
        <div id='filter-other'>
          <form>
            <FormGroup bsSize="small">
              <InputGroup>
                <InputGroup.Addon>pid</InputGroup.Addon>
                <FormControl type="number" placeholder='pid'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('pid', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>tid</InputGroup.Addon>
                <FormControl type="number" placeholder='tid'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('tid', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>tag</InputGroup.Addon>
                <FormControl type="text" placeholder='tag'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('tag', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>msg</InputGroup.Addon>
                <FormControl type="text" placeholder='message'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('message', event.target.value)}/>
              </InputGroup>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

export default Pane;
