import * as express from 'express';
import * as basicAuth from 'express-basic-auth';

const port = process.env.PORT || 8080;


//
// Express setup
//
var server = express();
server.use(basicAuth({
  users: { 'admin': 'password' }
}));


//
// Requests
// 
server.get('/party', function (req, res) {
  res.send('GET received.')
});

server.post('/register', function (req, res) {
  res.send('POST received.');
});

server.post('/guests', function (req, res) {
  res.send('GET received.');
});


//
// Start the server
//
server.listen(port);