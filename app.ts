import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { STATUS_CODES } from 'http';
import { Party } from './birthday';

//
// Constants
//
const port = 8080;
const party: Party = {
    title: "Matthias' Awesome Birthday Party",
    location: "Weistrach",
    date: "1.1.2020"
};

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
    res.send(JSON.stringify(party));
});

server.post('/register', (req, res) => {
    if(!req.body.firstname || !req.body.lastname) {
        res.status(400);
    } else {
        // TODO: add to the list, send response
    }
});

server.get('/guests', (req, res) => {

});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));