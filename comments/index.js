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
    comments.push({id : commentId, content, status: 'pending'});
    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
       data : {id : commentId, content, postId, status: 'pending'}
    })

    res.status(201).send({id : commentId, content});
})

app.post('/events', async (req, res) => {
    console.log('Event Received', req.body.type)

    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status; 
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
           data : {id, content, postId, status}
        })
    
   }
    res.send({});
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


 