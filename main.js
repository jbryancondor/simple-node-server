const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('GET');
    res.status(202).end();
})

app.post('/', (req, res) => {
    console.log('POST');
    res.status(202).end();
})

app.get('/webhook', (req, res) => {
    console.log('GET webhook');
    res.status(202).end();
})

app.post('/webhook', (req, res) => {
    console.log('POST webhook');
    res.status(202).end();
})

app.listen(port, () => {
    console.log(`Simple Server app listening on port ${port}`)
})