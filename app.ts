import * as loki from 'lokijs';
import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { OK, BAD_REQUEST, UNAUTHORIZED, getStatusText } from 'http-status-codes';

import { PartyData, Party, Guest } from './birthday';


//
// Constants
//
const port = 8080;


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

let collection: Collection<Party>;


//
// Functions
//
function onDatabaseLoad() {
    if (!(collection = database.getCollection('parties'))) {
        collection = database.addCollection('parties');
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
server.get('/party/:partyId', (req, res) => {
    // res.send(JSON.stringify(party.partyData));
});

server.post('/new_party/:partyId', (req, res) => {
    if (!req.params.partyId || !req.body.partyTitle || !req.body.partyLocation || !req.body.partyDate) {
        res.sendStatus(BAD_REQUEST);
    } else {
        collection.insert({
            partyId: req.params.partyId,
            partyData: {
                title: req.body.partyTitle,
                location: req.body.partyLocation,
                date: req.body.partyDate
            },
            guests: []
        });

        res.sendStatus(OK);
    }
});

server.post('/register/:partyId', (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        res.sendStatus(BAD_REQUEST);
    } else if (collection.data.length >= 10) {
        res.sendStatus(UNAUTHORIZED);
    } else {
        // party.guests.push({ firstname: req.body.firstname, lastname: req.body.lastname });
        // collection.update(party);
        res.sendStatus(OK);
    }
});

server.get('/guests/:partyId', auth, (req, res) => {
    // res.send(collection.data.filter(guest => delete guest.meta && delete guest.$loki));
});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));