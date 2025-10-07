var http = require('http');

http.createServer(function (req, res) {
  res.write("0410420142014");
  res.end();
}).listen(4040);
