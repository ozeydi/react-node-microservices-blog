const express = require('express');
const cors = require('cors');

const { randomBytes } = require('crypto');


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

const port = 4000;

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id])
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


 