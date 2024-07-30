const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('GET');
    res.status(200).end();
})

app.post('/', (req, res) => {
    console.log('POST body:', req.body);
    res.status(200).end();
})

app.post('/', (req, res) => {
    console.log('PUT');
    res.status(200).end();
})

app.get('/webhook', (req, res) => {
    console.log('GET webhook');
    res.status(200).end();
})

app.post('/webhook', (req, res) => {
    console.log('POST webhook');
    res.status(200).end();
})

app.put('/webhook', (req, res) => {
    console.log('POST webhook');
    res.status(200).end();
})

app.listen(port, () => {
    console.log(`Simple Server app listening on port ${port}`)
})