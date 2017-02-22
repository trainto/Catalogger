'use strict'

import fs from 'fs'
import readline from 'readline'

class LogParser {
  constructor() {
    this.pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;
  }

  parse(file, callback) {
    const inputFile = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: inputFile
    });

    let result = [];
    rl.on('line', (input) => {
      let match = this.pattern.exec(input);
      if (match) {
        result.push({
          time: match[1] + " " + match[2],
          pid: match[3],
          tid: match[4],
          level: match[5],
          tag: match[6],
          message: match[8]
        });
      }
    });

    rl.on('close', () => {
      inputFile.close();
      rl.close();
      callback(result);
    });
  }

  parseLine(line, callback) {
    let result;
    let match = this.pattern.exec(line);
    if (match) {
      result = {
        time: match[1] + " " + match[2],
        pid: match[3],
        tid: match[4],
        level: match[5],
        tag: match[6],
        message: match[8]
      };
      callback(result);
    }
  }
}

export default LogParser
