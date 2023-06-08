const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4005;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("event " + event.type + " Received");
  // posts
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  //comments
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  //query
  axios.post("http://query-clusterip-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  //moderation
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
