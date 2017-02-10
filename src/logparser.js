'use strict'

const fs = require('fs');
const readline = require('readline');

class LogParser {
  parse (file, callback) {
    let pattern =
      /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;

    const inputFile = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: inputFile
    });

    let result = [];
    rl.on('line', (input) => {
      let match = pattern.exec(input);
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
}

export default LogParser
