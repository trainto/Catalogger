process.on('message', function(line) {
  // readLine.on('line', function(line) {
  console.log("parser start!");
    var pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)\s+(.*)/;
    var match = pattern.exec(line);
    if (!match) return;
    var data = {
      date: match[1].trim(),
      time: match[2].trim(),
      pid: match[3].trim(),
      tid: match[4].trim(),
      level: match[5].trim(),
      tag: match[6].trim(),
      msg: match[7].trim()
    };
    var retStr = '<tr><td>' + data.date + '</td><td>' +
      data.time + '</td><td>' + data.pid + '</td><td>' + data.tid + '</td><td>' +
      data.level + '</td><td>' + data.tag + '</td><td>' + data.msg + '</td></tr>';
    process.send(retStr);
  // })
});
