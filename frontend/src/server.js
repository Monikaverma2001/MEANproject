const http = require('http');  
const app = require('../../backend/server');  
  
const server = http.createServer(app);  

server.listen(5000);  