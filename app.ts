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
    date: new Date("1.1.2020")
};


// Basic Auth
const users = {
    users: { 'admin': 'admin' }
};

const auth: express.RequestHandler = basicAuth(users);


// Loki
const lokiConfig = {
    autoload: true,
    autoloadCallback: onDatabaseLoad,
    autosave: true,
    autosaveInterval: 1000
};

const database = new loki('birthday-party.db', lokiConfig);

let collection;


//
// Functions
//
function onDatabaseLoad() {
    if (!(collection = database.getCollection('guests'))) {
        collection = database.addCollection('guests');
    }
}


//
// Express setup
//
const server = express();

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
    res.send(collection.data.filter(guest => delete guest.meta && delete guest.$loki));
});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));