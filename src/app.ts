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
    if (!req.params.partyId) {
        res.sendStatus(BAD_REQUEST);
    } else {
        const party = collection.data.find(party => party.partyId === req.params.partyId);

        if (party)
            res.send(party.partyData);
        else
            res.sendStatus(BAD_REQUEST);
    }
});

server.post('/new_party/:partyId', (req, res) => {
    if (!req.params.partyId || !req.body.partyTitle || !req.body.partyLocation || !req.body.partyDate) {
        res.sendStatus(BAD_REQUEST);
    } else {
        const party = collection.data.find(party => party.partyId === req.params.partyId);

        if(!party) {
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
        } else {
            res.sendStatus(BAD_REQUEST);
        }
    }
});

server.post('/register/:partyId', (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        res.sendStatus(BAD_REQUEST);
    } else if (collection.data.length >= 10) {
        res.sendStatus(UNAUTHORIZED);
    } else {
        let party = collection.data.find(party => party.partyId === req.params.partyId);

        if (party) {
            party.guests.push({ firstname: req.body.firstname, lastname: req.body.lastname });
            collection.update(party);

            res.sendStatus(OK);
        } else {
            res.sendStatus(BAD_REQUEST);
        }
    }
});

server.get('/guests/:partyId', auth, (req, res) => {
    if (!req.params.partyId) {
        res.sendStatus(BAD_REQUEST);
    } else {
        const party = collection.data.find(party => party.partyId === req.params.partyId);

        if (party) {
            const { partyId, partyData, guests } = party;

            res.send({
                partyId: partyId,
                partyData: partyData,
                guests: guests
            });
        } else {
            res.sendStatus(BAD_REQUEST);
        }
    }
});


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));