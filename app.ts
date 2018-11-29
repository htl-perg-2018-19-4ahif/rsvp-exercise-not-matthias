import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { OK, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

import { Party } from './birthday';

//
// Constants
//
const port = 8080;

const users = {
    users: { 'admin': 'admin' }
};

const auth = basicAuth(users);

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


//
// Requests
//
server.get('/party', (req, res) => {
    res.send(JSON.stringify(party));
});

server.post('/register', (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        res.sendStatus(BAD_REQUEST);
    } else {
        // TODO: add to the list, send response

        res.sendStatus(OK);
    }
});

server.get('/guests', auth, (req, res) => {
    res.sendStatus(OK);
});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));