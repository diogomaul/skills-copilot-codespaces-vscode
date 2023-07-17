//create a web server
//create a route handler
//listen on a port

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// app.get('/posts/:id/comments', (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });

app.get('/posts/:id/comments', async (req, res) => {
  const { data } = await axios.get(
    `http://localhost:4002/posts/${req.params.id}/comments`
  );

  res.send(data);
});

// app.post('/posts/:id/comments', (req, res) => {
//   const commentId = randomBytes(4).toString('hex');
//   const { content } = req.body;

//   const comments = commentsByPostId[req.params.id] || [];

//   comments.push({ id: commentId, content });

//   commentsByPostId[req.params.id] = comments;

//   res.status(201).send(comments);
// });

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // const comments = commentsByPostId[req.params.id] || [];

  // comments.push({ id: commentId, content });

  // commentsByPostId[req.params.id] = comments;

  // await axios.post('http://localhost:4005/events', {
  //   type: 'CommentCreated',
  //   data: {
  //     id: commentId,
  //     content,
  //     postId: req.params.id,
  //     status: 'pending',
  //   },
  // });

  await axios.post(`http://localhost:4005/events`, {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);

  const { type, data


    //what