'user strict';

import React from 'react';
import {form, FormGroup, InputGroup, FormControl, Glyphicon, Checkbox, Button} from 'react-bootstrap';
import {dispatcher} from '../dispatcher';
import './styles/pane.css';

class Pane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterNameInput: false,
      filterList: this._getFilterList()
    };

    this._onFilterSaveClicked = this._onFilterSaveClicked.bind(this);
    this._onFilterSaved = this._onFilterSaved.bind(this);
    this._onKeyFilterName = this._onKeyFilterName.bind(this);
    this._onFilterSaveCanceled = this._onFilterSaveCanceled.bind(this);
    this.setFilterSaved = this.setFilterSaved.bind(this);
    this.onFilterRemoveSucceed = this.onFilterRemoveSucceed.bind(this);
  }

  _getFilterList() {
    let filterNameList = dispatcher.onFilterSetListRequired();
    let filterButtonList = [];
    filterNameList.forEach((name) => {
      filterButtonList.push(
        <div key={name}>
          <Button bsStyle="link"
            onClick={(ev) => dispatcher.onFilterClicked(
              ev.target.innerText.trim(), this.setFilterSaved
            )}
          >
            <li>{name}</li>
          </Button>
          <Button className="btn-remove btn-remove-filter" bsStyle="link"
            bsSize="xsmall" onClick={() => dispatcher.onFilterRemoved(
              name, this.onFilterRemoveSucceed
            )}
          >
            <Glyphicon glyph='minus-sign' />
          </Button>
        </div>
      );
    });

    return filterButtonList;
  }

  _onFilterSaveClicked() {
    this.setState({
      showFilterNameInput: true
    });
  }

  _onFilterSaved() {
    const filterSetName = document.getElementById('filter-name').value.trim();
    if (filterSetName !== '') {
      let filterSet = this._getCurrentFilterSet();

      dispatcher.onFilterSave(filterSetName, filterSet, () => {
        this.setState({
          showFilterNameInput: false,
          filterList: this._getFilterList()
        });
      });
    }
  }

  _getCurrentFilterSet() {
    let filterSet = {};

    let levelV = document.getElementById('filter-level-v').checked;
    let levelD = document.getElementById('filter-level-d').checked;
    let levelI = document.getElementById('filter-level-i').checked;
    let levelW = document.getElementById('filter-level-w').checked;
    let levelE = document.getElementById('filter-level-e').checked;
    levelV ? filterSet.V = true : filterSet.V = false;
    levelD ? filterSet.D = true : filterSet.D = false;
    levelI ? filterSet.I = true : filterSet.I = false;
    levelW ? filterSet.W = true : filterSet.W = false;
    levelE ? filterSet.E = true : filterSet.E = false;

    filterSet.pid = document.getElementById('filter-pid').value;
    filterSet.tid = document.getElementById('filter-tid').value;
    filterSet.tag = document.getElementById('filter-tag').value;
    filterSet.message = document.getElementById('filter-message').value;

    return filterSet;
  }

  _onKeyFilterName(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this._onFilterSaved();
    }
  }

  _onFilterSaveCanceled() {
    this.setState({
      showFilterNameInput: false
    });
  }

  setFilterSaved(filter) {
    document.getElementById('filter-level-v').checked = filter.V;
    document.getElementById('filter-level-d').checked = filter.D;
    document.getElementById('filter-level-i').checked = filter.I;
    document.getElementById('filter-level-w').checked = filter.W;
    document.getElementById('filter-level-e').checked = filter.E;

    document.getElementById('filter-pid').value = filter.pid;
    document.getElementById('filter-tid').value = filter.tid;
    document.getElementById('filter-tag').value = filter.tag;
    document.getElementById('filter-message').value = filter.message;
  }

  onFilterRemoveSucceed(filterName) {
    let newFilterList = [];
    this.state.filterList.forEach((div) => {
      if (div.key !== filterName) {
        newFilterList.push(div);
      }
    });
    this.setState({
      filterList: newFilterList
    });
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
            <Checkbox id='filter-level-v' onChange={
              (event) => dispatcher.onFilterChanged('V', event.target.checked)
            }>
              Verbose
            </Checkbox>
            <Checkbox id='filter-level-d' className='checkbox-stacked'
              onChange={
                (event) => dispatcher.onFilterChanged('D', event.target.checked)
              }
            >
              Debug
            </Checkbox>
            <Checkbox id='filter-level-i' className='checkbox-stacked'
              onChange={
                (event) => dispatcher.onFilterChanged('I', event.target.checked)
              }
            >
              Info
            </Checkbox>
            <Checkbox id='filter-level-w' className='checkbox-stacked'
              onChange={
                (event) => dispatcher.onFilterChanged('W', event.target.checked)
              }
            >
              Warn
            </Checkbox>
            <Checkbox id='filter-level-e' className='checkbox-stacked'
              onChange={
                (event) => dispatcher.onFilterChanged('E', event.target.checked)
              }
            >
              Error
            </Checkbox>
          </form>
        </div>
        <div id='filter-other'>
          <form>
            <FormGroup bsSize="small">
              <InputGroup>
                <InputGroup.Addon>pid</InputGroup.Addon>
                <FormControl id='filter-pid' type="number" placeholder='pid'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('pid', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>tid</InputGroup.Addon>
                <FormControl id='filter-tid' type="number" placeholder='tid'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('tid', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>tag</InputGroup.Addon>
                <FormControl id='filter-tag' type="text" placeholder='tag'
                    onKeyPress={dispatcher.preventEnter}
                    onChange={(event) => dispatcher.onFilterChanged('tag', event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>msg</InputGroup.Addon>
                <FormControl id='filter-message' type="text"
                  placeholder='message' onKeyPress={dispatcher.preventEnter}
                  onChange={(event) => dispatcher.onFilterChanged('message', event.target.value)}/>
              </InputGroup>
            </FormGroup>
          </form>
        </div>
        <div id='add-filter'>
          {this.state.showFilterNameInput ?
            <form>
              <FormControl id='filter-name'
                type="text" placeholder="Enter filter name"
                onKeyPress={this._onKeyFilterName}
              />
            <Button bsStyle="link" bsSize="large" className="btn-add"
              onClick={this._onFilterSaved}>
              <Glyphicon glyph='plus-sign' />
            </Button>
            <Button bsStyle="link" bsSize="large" className="btn-remove"
              onClick={this._onFilterSaveCanceled}>
              <Glyphicon glyph='remove-sign' />
            </Button>
            </form>
            :
            <Button bsStyle="link" onClick={this._onFilterSaveClicked}>
              <Glyphicon glyph='plus-sign' /> Save as..
            </Button>
          }
        </div>
        <div id='filter-list'>
          <ul>
            {[this.state.filterList]}
          </ul>
        </div>
      </div>
    );
  }
}

export default Pane;
