'use strict'

class Dispatcher {

  setLogTable(table) {
    this.logTable = table;
  }

  onClickStart() {
  }

  onClickClear() {
    this.logTable.clearTable.call(this.logTable);
  }
}

export const dispatcher = new Dispatcher();
