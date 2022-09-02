//Importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessage.js';
import Pusher from 'pusher';
import cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1118367",
    key: "555e38757b4aab7797aa",
    secret: "22cee89dd69c55df8c6f",
    cluster: "eu",
    useTLS: true
  });

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB is connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

// Middlewares

app.use(express.json())
app.use(cors())

// DB config

const connection_url = "mongodb+srv://adin:Q01PWCN3K2aoXZzc@cluster0.jlwmi.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connection_url)

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//API Endpoint

app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})

app.get('/api/v1/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create( dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send("New message created" + data)
        }
    })
})

//Listener
app.listen( port, () => console.log('Listening on local host' + port ))