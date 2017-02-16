'user strcit'

class Filter {
  constructor() {
    this.indexMap = [];

    this.filterEnabled = false;

    this.filterState = new Map();
    this.filterState.set('quick', '');
    // this.filterState.set('app', '');
    this.filterState.set('pid', '');
    this.filterState.set('tid', '');
    this.filterState.set('level', '');
    this.filterState.set('message', '');
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

  updateFilterState(filterBy) {
    filterBy.forEach((val, key) => {
      this.filterState.set(key, val);
    });

    this.filterEnabled = false;
    this.filterState.forEach((val, key) => {
      if (val !== '') {
        this.filterEnabled = true;
      }
    });
  }

  setFilter(filterBy, data) {
    this.updateFilterState(filterBy)
    this._resetIndexMapWithQuickFilter(data);
  }

  addRows(startIndex, data) {
    for (let i = startIndex; i < data.length; i++) {
      if (this._needToAdd(data[i]) && this._needToAddByQuick(data[i])) {
        this.indexMap.push(i);
      } else if (this._needToAddByQuick(data[i])) {
        this.indexMap.push(i);
      }
    }
  }

  _needToAdd(row) {
    this.filterState.forEach((val, key) => {
      if (key !== 'quick' && val !== '') {
        let text;
        switch (key) {
          case 'pid':
            let {pid} = row;
            text = pid;
            break;
          case 'tid':
            let {tid} = row;
            text = tid;
            break;
          case 'level':
            let {level} = row;
            text = level;
            break;
          case 'tag':
            let {tag} = row;
            text = tag;
            break;
          case 'message':
            let {message} = row;
            text = message;
            break;
          default:
            break;
        }

        if (text.toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
    });
  }

  _needToAddByQuick(row) {
    if (this.filterState.get('quick') === '') {
      return true;
    } else {
      const {tag, message} = row;
      const filterText = this.filterState.get('quick').toLowerCase();
      if (message.toLowerCase().indexOf(filterText) !== -1 ||
          tag.toLowerCase().indexOf(filterText) !== -1) {
        return true;
      }
    }
  }

  _resetIndexMapWithQuickFilter(data) {
    this.indexMap = [];
    const filterText = this.filterState.get('quick').toLowerCase();
    for (let i = 0; i < data.length; i++) {
      let {tag, message} = data[i];
      if (message.toLowerCase().indexOf(filterText) !== -1 ||
          tag.toLowerCase().indexOf(filterText) !== -1) {
        this.indexMap.push(i);
      }
    }
  }
}

export const filter = new Filter()
