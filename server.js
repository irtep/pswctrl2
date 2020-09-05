//const process = require ('./config.js');
const express = require("express");
//const bodyParser = require('body-parser');
const app = express();
const pasw = process.env.SECRET2;
//const bcrypt = require('bcrypt');
const saltRounds = process.env.SECRET3;
app.use(express.static('public'));
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// GET handler
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
  console.log('get received');
});

const listener = app.listen(5545, () => {  // old 5544
  console.log("Your app is listening on port " + listener.address().port);
});
