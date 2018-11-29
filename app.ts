import * as loki from 'lokijs';
import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { OK, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

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

const users = {
    users: { 'admin': 'admin' }
};

const auth = basicAuth(users);

const database = new loki('party.db');
const collection = database.addCollection('guests');


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
    } else if (collection.data.length >= 10) {
        res.sendStatus(UNAUTHORIZED);
    } else {
        collection.insert({ firstname: req.body.firstname, lastname: req.body.lastname });
        res.sendStatus(OK);
    }
});

server.get('/guests', auth, (req, res) => {
    const data = collection.data;

    // Remove unnecessary data
    data.forEach(guest => {
        delete guest.meta;
        delete guest.$loki;
    });

    res.send(data);
});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));