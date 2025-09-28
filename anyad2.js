var http = require('http');

http.createServer(function (req, res) {
  res.write("0x0007b");
  res.end();
}).listen(8080);
