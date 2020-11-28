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


// SERVER IF YOU NEED ACCESS TO MONGODB
/*
const process = require ('./config.js');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const pasw = process.env.SECRET2;
const bcrypt = require('bcrypt');
const saltRounds = process.env.SECRET3;
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// database access:
const mongoose = require('mongoose');
const mongoDB = process.env.SECRET1; // admin
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;

const entrySchema = new Schema( {
  site: {
    type: String
  },
  userName: {
    type: String
  },
  psw: {
    type: String
  }
});

//const entryModel = mongoose.model('ot2model', entrySchema );
const entryModel = mongoose.model('pswxmodel', entrySchema );

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// GET handler
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
  console.log('get received');
});
// POST handlers
// show all entries
app.post('/showAll', (request, response) => {
  console.log('show All came');
  const requestPass = request.body.MSG;
  const newDbConnect = new Promise( (resolve, reject) => {
    entryModel.find((err, results) => {
      if (results !== null) {
        console.log('got results from db');
        resolve(results);
      }
    });
  });
  newDbConnect.then( (results) => {
    let responding = null;
    //if (pasw === requestPass) {
      console.log('comparing psw', pasw, requestPass);
      responding = JSON.stringify(results);
    //} else {
    //  responding = 'wrong password';
    //}
    const sending = responding;
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(sending);
  });

});
// add new entry:
app.post('/addNew', (request, response) => {
  const newEntryComing = JSON.parse(request.body.MSG);
  //const theQuery = { name: 'ot2'};
  //console.log('newEntryComing: ', newEntryComing);
  const newEntry = entryModel({
    site: newEntryComing.site,
    userName: newEntryComing.userName,
    psw: newEntryComing.psw
  });
  //console.log('newEntry: ', newEntry);
  newEntry.save( (err, entry1) => {
    if (err) return console.error(err);
    console.log("saved to entries collection.");
  });
  const sending = JSON.stringify('Database updated successfully!');
  //console.log("responding with data ");
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(sending);

});
app.post('/updateOld', (request, response) => {

});
const listener = app.listen(5545, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
*/
