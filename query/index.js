const express = require('express');
const cors = require('cors');


const app = express();
const port = 4002;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})


app.post('/events', (req, res) => {
    const { type, data } = req.body;
    if (type === 'PostCreated' ) {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
        console.log('postcreated added', posts)   
    }
    if (type === 'CommentCreated') {
        const {id, content, postId} = data;
        const post = posts[postId];
        console.log('post', post)
        post.comments.push({id, content, postId})
    }
        res.send({})
})


app.listen(port, () => {
    console.log(`listening on ${port}`)
})