const express = require("express");
const bodyParser = require("body-parser"); // Server setup
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Setting server parameters
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.post("/posts", (req, res) => {
  res.json(req.body); // Route to add posts to the server
});

app.get("/posts", (req, res) => {
  res.send(req.body); // Route to get posts fron the server (not working)
});

app.listen(3333, () => {
  console.log("Server started"); // Load server and wait connections
});
