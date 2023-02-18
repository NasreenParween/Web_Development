const http = require('http');

const hostname = 'localhost';
const port = 10000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<center> <h1> Hello World, This is my Node.js server </h1> </center>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});