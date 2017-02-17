'use strcit'

import {filter} from './filter'

class DataWrapper {
  constructor(data, filter) {
    this.data = data;
    this.filter = filter;
  }

  getSize() {
    if (this.data === undefined || this.data === null) {
      console.log('datawrapper.js: data is' + this.data);
      return 0;
    }

    if (this.filter.filterEnabled) {
      return this.filter.getSize();
    }

    return this.data.length;
  }

  getObjectAt(index) {
    if (this.filter.filterEnabled) {
      return this.data[this.filter.getFilteredIndex(index)];
    }
    return this.data[index];
  }

  setData(newData) {
    this.data = newData;
  }

  push(rows) {
    this.data.push(...rows);
    if (this.filter.filterEnabled) {
      const startIndex = this.data.length - rows.length;
      this.filter.addRows(startIndex, this.data);
    }
  }

  clear() {
    this.data = [];
    this.filter.clearIndexMap();
  }

  changeFilter(filterBy) {
    this.filter.setFilter(filterBy, this.data);
  }
}

export const dataWrapper = new DataWrapper([], filter)
