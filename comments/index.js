const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

const port = 4001;

const posts = {};

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.send(commentsByPostId[postId] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const  postId  = req.params.id;
    const { content } = req.body;
    
    const comments = commentsByPostId[postId] || [];
    comments.push({id : commentId, content});
    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
       data : {id : commentId, content, postId}
    })

    res.status(201).send({id : commentId, content})
})

app.post('/events', (req, res) => {
    console.log('Event Received', req.body.type)
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


 