'use strcit'

import {filter} from './filter'

class DataWrapper {
  constructor(data, filter) {
    this.data = data;
  }

  getSize() {
    if (this.data === undefined || this.data === null) {
      console.log('datawrapper.js: data is' + this.data);
      return 0;
    }

    if (filter.filterOn) {
      return filter.getSize();
    }

    return this.data.length;
  }

  getObjectAt(index) {
    if (filter.filterOn) {
      return this.data[filter.getFilteredIndex(index)];
    }
    return this.data[index];
  }

  resetData() {
    this.data = [];
    filter.resetIndexMap();
  }

  setData(newData) {
    this.data = newData;
  }

  push(rows) {
    this.data.push(...rows);
    if (filter.filterOn) {
      const startIndex = this.data.length - rows.length;
      filter.addRowsIfNeeded(startIndex, this.data);
    }
  }

  clear() {
    this.data = [];
    filter.clearIndexMap();
  }

  changeFilter(filterBy, callback) {
    filter.setFilter(filterBy, this.data, callback);
  }
}

export const dataWrapper = new DataWrapper([])
