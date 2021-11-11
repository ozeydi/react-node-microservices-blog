const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const port = 4003

app.POST('/events', (req, res) => {

});


app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})