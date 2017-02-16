'user strcit'

class Filter {
  constructor() {
    this.indexMap = [];

    this.filterEnabled = false;

    this.filterState = new Map();
    this.filterState.set('quick', '');
    this.filterState.set('app', '');
    this.filterState.set('pid', '');
    this.filterState.set('tid', '');
    // this.filterState.set('level', ''); //level will be handled by div class
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
    this.resetIndexMapWithQuickFilter(data);
  }

  resetIndexMapWithQuickFilter(data) {
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
