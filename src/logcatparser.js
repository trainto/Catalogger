var pattern =
  /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;

process.on('message', function(lines) {
  var retStr = '';
  for (var i in lines) {
    var match = pattern.exec(lines[i]);
    if (!match) continue;

    var logLevelClass = '';
    switch (match[5].trim().toLowerCase()) {
      case 'i':
        logLevelClass = 'log-level-i';
        break;
      case 'v':
        logLevelClass = 'log-level-v';
        break;
      case 'd':
        logLevelClass = 'log-level-d';
        break;
      case 'e':
        logLevelClass = 'log-level-e';
        break;
      case 'w':
        logLevelClass = 'log-level-w';
        break;
      default:
        logLevelClass = 'log-level-v';
    }

    var pidClass = 'pid-' + match[3].trim();
    var tidClass = 'tid-' + match[4].trim();

    var parsedStr = '<tr class=\"' + logLevelClass + ' ' + pidClass + ' ' +
        tidClass + '\"><td>' + match[1].trim() + '</td><td>' + match[2].trim() +
        '</td><td>' + match[3].trim() + '</td><td>' + match[4].trim() +
        '</td><td>' + match[5].trim() + '</td><td>' + match[6].trim() +
        '</td><td>' + match[8].trim() + '</td></tr>';

    retStr += parsedStr;
  }

  if (retStr !== '') {
    process.send(retStr);
  }
});
