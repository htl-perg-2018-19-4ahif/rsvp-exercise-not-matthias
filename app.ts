import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { STATUS_CODES } from 'http';

const port = 8080;


//
// Express setup
//
var server = express();
server.use(express.json());
// server.use(basicAuth({
//   users: { 'admin': 'password' }
// }));


//
// Requests
// 
server.get('/party', (req, res) => {

});

server.post('/register', (req, res) => {

});

server.get('/guests', (req, res) => {

});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));