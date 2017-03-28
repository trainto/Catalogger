'use strict';

import fs from 'fs';
import path from 'path';
import os from 'os';

class Config {
  constructor() {
    this.filterSetConfigFile = path.join(
      os.homedir(), '.catalogger', 'filter.json'
    );
  }

  ensureDirectoryExistence(filePath) {
    let dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
      return;
    }
    this.ensureDirectoryExistence(dirName);
    fs.mkdirSync(dirName);
  }

  readFilterSet() {
    let ret = [];
    let filterSetString;
    try {
      filterSetString = fs.readFileSync(this.filterSetConfigFile, 'utf8');
      ret = JSON.parse(filterSetString);
    } catch (exception) {
      console.log('config.js:readFilterSet() - ' + exception);
    }

    return ret;
  }

  writeFile(filterList, successCallback) {
    this.ensureDirectoryExistence(this.filterSetConfigFile);
    try {
      fs.writeFileSync(this.filterSetConfigFile,
        JSON.stringify(filterList, null, '  '), 'utf-8');
      successCallback();
    } catch (exception) {
      console.log('config.js:writeFilterSet() - ' + exception);
    }
  }

  writeFilterSet(filterSetName, filterSet, successCallback, errCallback) {
    let currentFilterSet = this.readFilterSet();

    // Check if there is a filter has the same name
    for (let i in currentFilterSet) {
      if (currentFilterSet[i].hasOwnProperty(filterSetName)) {
        errCallback({
          message: '\"' + filterSetName + '\"'
            + ' already exists!\nTry another name ^^'
        });
        return;
      }
    }

    currentFilterSet.push({[filterSetName]: filterSet});
    this.writeFile(currentFilterSet, successCallback);
  }

  getFilterSet(name) {
    let ret;
    let filters = this.readFilterSet();
    filters.forEach((filter) => {
      if (filter.hasOwnProperty(name)) {
        ret = filter;
      }
    });

    return ret;
  }

  removeFilter(name, onFilterRemoveSucceed) {
    let filters = this.readFilterSet();
    let newFilters = [];
    filters.forEach((filter) => {
      if (!filter.hasOwnProperty(name)) {
        newFilters.push(filter);
      }
    });
    this.writeFile(newFilters, onFilterRemoveSucceed);
  }
}

export default Config;
