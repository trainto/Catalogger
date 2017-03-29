'user strcit';

class Filter {
  constructor() {
    this.indexMap = [];

    this.filterOn = false;

    this._filterTimer = undefined;

    this._filterState = new Map();
    this._filterState.set('quick', '');
    // this._filterState.set('app', '');
    this._filterState.set('pid', '');
    this._filterState.set('tid', '');
    this._filterState.set('level', '');
    this._filterState.set('message', '');
  }

  resetIndexMap() {
    this.indexMap = [];
  }

  getSize() {
    return this.indexMap.length;
  }

  getFilteredIndex(index) {
    return this.indexMap[index];
  }

  clearIndexMap() {
    this.indexMap = [];
  }

  rebuildIndexMap(data) {
    this.indexMap = [];
    this.addRowsIfNeeded(0, data);
  }

  _updateFilterState(filterBy) {
    filterBy.forEach((val, key) => {
      if (key === 'level') {
        if (val[1]) { // Add Level
          this._filterState.set(key, this._filterState.get(key).concat(val[0]));
        } else { // Remove Level
          this._filterState.set(
            key, this._filterState.get(key).replace(val[0], ''));
        }
      } else {
        this._filterState.set(key, val);
      }
    });

    this.filterOn = false;
    this._filterState.forEach((val, key) => {
      if (val !== '') {
        this.filterOn = true;
      }
    });
  }

  setFilter(filterBy, data, callback) {
    this._updateFilterState(filterBy);
    clearTimeout(this._filterTimer);
    this._filterTimer = setTimeout(() => {
      this.rebuildIndexMap(data);
      callback();
    }, 1500);
  }

  addRowsIfNeeded(startIndex, data) {
    for (let i = startIndex; i < data.length; i++) {
      if (this._needToAdd(data[i])) {
        this.indexMap.push(i);
      }
    }
  }

  _needToAdd(row) {
    let ret = true;
    let {tag, message} = row;
    this._filterState.forEach((val, key) => {
      if (val !== '') {
        switch (key) {
        case 'quick':
          if (tag.toLowerCase().indexOf(val.toLowerCase()) === -1 &&
              message.toLowerCase().indexOf(val.toLowerCase()) === -1) {
            ret = false;
          }
          break;
        case 'pid': {
          let {pid} = row;
          if (pid.toLowerCase().indexOf(val) === -1) {
            ret = false;
          }
          break;
        }
        case 'tid': {
          let {tid} = row;
          if (tid.toLowerCase().indexOf(val) === -1) {
            ret = false;
          }
          break;
        }
        case 'level': {
          let {level} = row;
          if (val.indexOf(level) === -1) {
            ret = false;
          }
          break;
        }
        case 'tag':
          if (tag.toLowerCase().indexOf(val.toLowerCase()) === -1) {
            ret = false;
          }
          break;
        case 'message':
          if (message.toLowerCase().indexOf(val.toLowerCase()) === -1) {
            ret = false;
          }
          break;
        default:
          break;
        }
      }
    });

    return ret;
  }
}

export const filter = new Filter();
