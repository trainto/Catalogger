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
  }

  clear() {
    this.data = [];
    this.filter.clearIndexMap();
  }

  changeFilter(filterBy) {
    filter.setFilter(filterBy, this.data);
  }
}

export const dataWrapper = new DataWrapper([], filter)
