const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// Mongodb APIs
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = "mongodb+srv://Rethink2021:<Password>@rethink-project.j3yqh.mongodb.net/major_list?retryWrites=true&w=majority";

// GET API for getting majors
app.get('/api/major', function(req, res) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  var id = parseInt(req.query.id);
  client.connect(err => {
    const collection = client.db("major_list").collection("major");
    // perform actions on the collection object
    collection.find({}).sort({major_id: 1}).limit(id+20).skip(id).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

// GET API for getting original url
app.get('/api/item', function(req, res) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  let originalURL = req.query.originalURL;
  client.connect(err => {
    const collection = client.db("major_list").collection("url");
    // perform actions on the collection object
    collection.find({"original_url": originalURL}).toArray(function(err, result) {
      if (err) throw err;
      console.log("Data fetched successfully!");
      res.send(result);
      client.close();
    });
  });
});

// POST API for adding new url
app.post('/api/addItem', function(req, res) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  let myData = req.body;
  client.connect(err => {
    const collection = client.db("major_list").collection("url");
    // perform actions on the collection object
    collection.insertOne(myData, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      client.close();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
