'user strcit'

class Filter {
  constructor() {
    this.indexMap = [];

    this.filterOn = false;
    this._filterEnabled = false;

    this._filterState = new Map();
    // this._filterState.set('app', '');
    this._filterState.set('pid', '');
    this._filterState.set('tid', '');
    this._filterState.set('level', '');
    this._filterState.set('message', '');

    this._quickFilter = '';
    this._quickFilterEnabled = false;
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

  _updateFilterState(filterBy) {
    filterBy.forEach((val, key) => {
      if (key === 'level') {
        if (val[1]) { // Add Level
          this._filterState.set(key, this._filterState.get(key).concat(val[0]))
        } else { // Remove Level
          this._filterState.set(
            key, this._filterState.get(key).replace(val[0], ''))
        }
      } else {
        this._filterState.set(key, val);
      }
    });

    this._filterEnabled = false;
    this._filterState.forEach((val, key) => {
      if (val !== '') {
        this._filterEnabled = true;
      }
    });

    this._quickFilterEnabled = false;
    const quickFilter = filterBy.get('quick');
    if (quickFilter && quicFilter !== '') {
      this._quickFilter = quickFilter;
      this._quickFilterEnabled = true;
    }

    this.filterOn = this._quickFilterEnabled || this._filterEnabled;
  }

  setFilter(filterBy, data) {
    this._updateFilterState(filterBy);
    console.log('setFilter')
    if (this.filterOn) {
      console.log('filter on');
      this.indexMap = [];
      this.addRowsIfNeeded(0, data);
    }
  }

  addRowsIfNeeded(startIndex, data) {
    for (let i = startIndex; i < data.length; i++) {
      let need = false;
      if (this._filterEnabled && this._needToAdd(data[i])) {
        need = true;
      }
      if (this._quickFilterEnabled && !this._needToAddByQuick(data[i])) {
        need = false;
      }
      if (need) {
        this.indexMap.push(i);
      }
    }
  }

  _needToAdd(row) {
    let ret = true;
    this._filterState.forEach((val, key) => {
      if (key !== 'quick' && val !== '') {
        let text;
        switch (key) {
          case 'pid':
            let {pid} = row;
            text = pid;
            if (pid.toLowerCase().indexOf(val) === -1) {
              ret = false;
            }
            break;
          case 'tid':
            let {tid} = row;
            if (tid.toLowerCase().indexOf(val) === -1) {
              ret = false;
            }
            break;
          case 'level':
            let {level} = row;
            if (val.indexOf(level) === -1) {
              ret = false;
            }
            break;
          case 'tag':
            let {tag} = row;
            if (tag.toLowerCase().indexOf(val) === -1) {
              ret = false;
            }
            break;
          case 'message':
            let {message} = row;
            if (message.toLowerCase().indexOf(val) === -1) {
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

  _needToAddByQuick(row) {
    const {tag, message} = row;
    const filterText = this._quickFilter.toLowerCase();
    if (message.toLowerCase().indexOf(filterText) !== -1 ||
        tag.toLowerCase().indexOf(filterText) !== -1) {
      return true;
    }
    return false;
  }
}

export const filter = new Filter()
