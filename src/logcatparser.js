var pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)\s+(.*)/;

process.on('message', function(lines) {
  var retStr = '';
  for (var i in lines) {
    var match = pattern.exec(lines[i]);
    if (!match) continue;

    var parsedStr = '<tr><td>' + match[1].trim() + '</td><td>' +
    match[2].trim() + '</td><td>' + match[3].trim() + '</td><td>' + match[4].trim() + '</td><td>' +
    match[5].trim() + '</td><td>' + match[6].trim() + '</td><td>' + match[7].trim() + '</td></tr>';

    retStr += parsedStr;
  }

  if (retStr !== '') {
    process.send(retStr);
  }
});
