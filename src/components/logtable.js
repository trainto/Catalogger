'use strict'

import React from 'react'
// import update from 'react-addons-update'
import {Table, Column, Cell} from 'fixed-data-table-2'
import Measure from 'react-measure'
import LogParser from '../adb/logparser'
import {dataWrapper} from '../datawrapper'
import Filter from '../filter'
import './styles/fixed-data-table.css'
import './styles/logtable.css'

class LogTable extends React.Component {
  constructor(props) {
    super(props);

    this.logData = dataWrapper;

    this.state = {
      dataToShow: this.logData,
      columnWidths: {
        time: 130,
        app: 100,
        pid: 50,
        tid: 50,
        level: 50,
        tag: 150,
        message: 3000
      },
      columnNames: {
        time: 'Time',
        app: 'App',
        pid: 'PID',
        tid: 'TID',
        level: 'Level',
        tag: 'Tag',
        message: 'Message'
      },
      dimensions: {
        width: -1,
        height: -1
      }
    };

    this.autoScroll = false;

    this._onColumnResizeEndCallback =
        this._onColumnResizeEndCallback.bind(this);
    this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
    this.setAutoScroll = this.setAutoScroll.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }));
  }

  _onDrop(ev) {
    const logParser = new LogParser();
    logParser.parse(ev.dataTransfer.files[0].path, (result) => {
      this.logData.setData(result);
      this.setState({
        dataToShow: this.logData
      });
    });
  }

  _rowClassNameGetter(index) {
    return 'Level' + this.state.dataToShow.getObjectAt(index).level;
  }

  setAutoScroll(enabled) {
    this.autoScroll = enabled;
  }

  clearTable() {
    this.logData.clear();
    this.setState({
      dataToShow: this.logData
    });
  }

  resetData() {
    this.setState({
      dataToShow: this.logData
    });

    if (this.autoScroll) {
      this.scrollToEnd();
    }
  }

  scrollBy(deltaX, deltaY) {
    this.logTable._onScroll(deltaX, deltaY);
  }

  scrollToEnd() {
    const endRow = this.state.dataToShow.getSize();
    this.setState({
      currentIndex: endRow
    });
  }

  render() {
    const {dataToShow, columnWidths, columnNames, dimensions} = this.state;
    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <div id="logtable" onDrop={this._onDrop.bind(this)}>
        <Table
          ref={(table) => this.logTable = table}
          rowsCount={dataToShow.getSize()}
          rowClassNameGetter={this._rowClassNameGetter}
          scrollToRow={this.state.currentIndex}
          rowHeight={16}
          headerHeight={16}
          width={dimensions.width}
          height={dimensions.height}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          {...this.props}>
          <Column
            columnKey="time"
            header={<Cell>{columnNames.time}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).time}
              </Cell>
            )}
            width={columnWidths.time}
            isResizable={true}
          />
          <Column
            columnKey="pid"
            header={<Cell>{columnNames.pid}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).pid}
              </Cell>
            )}
            width={columnWidths.pid}
            isResizable={true}
          />
          <Column
            columnKey="tid"
            header={<Cell>{columnNames.tid}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).tid}
              </Cell>
            )}
            width={columnWidths.tid}
            isResizable={true}
          />
          <Column
            columnKey="level"
            header={<Cell>{columnNames.level}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).level}
              </Cell>
            )}
            width={columnWidths.level}
            isResizable={true}
          />
          <Column
            columnKey="tag"
            header={<Cell>{columnNames.tag}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).tag}
              </Cell>
            )}
            width={columnWidths.tag}
            isResizable={true}
          />
          <Column
            columnKey="message"
            header={<Cell>{columnNames.message}</Cell>}
            cell={props => (
              <Cell {...props}>
                {dataToShow.getObjectAt(props.rowIndex).message}
              </Cell>
            )}
            width={columnWidths.message}
            isResizable={true}
          />
        </Table>
        </div>
      </Measure>
    );
  }
}

export default LogTable
