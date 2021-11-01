const express = require('express');
const axios = require('axios');


const app = express();
const port = 4005;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    
    res.send({ status: 'OK' });
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})