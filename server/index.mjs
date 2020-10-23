// first create folder for Mongo db under root  `sudo mkdir -p /data/db`
// set Owner sudo chown -R $USER /data
// install mongo follow https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
// start mongo `mongod` and keep terminal open
// now install mongo client to interact with the db
// `sudo apt install mongodb-clients`
// to acces mongodb enter `mongo`  and `db` at the prompt to see the exisiting databases

import express from 'express';
import {connectDb} from './db.mjs';
import ObjectId from 'mongodb';

const app = express();
// server port
const HTTP_PORT = 3030;
// client port
const CLIENT_HTTP_PORT = 3050;

// body parser
app.use(express.json());

// set headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // wildcard, only for localhost
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//start mongo
connectDb()
.then(client => {
  app.get("/", (req, res, next) => {
    res.json({"message":"Ok"});
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
  })

  const db = client.db('slogans')

  const slogansToStart = [
      { id: 1, slogan: "Feed the Planet and It Will Nourish You."},
      { id: 2, slogan: "Mother Earth Is Going to Get Mean If You Don't Go Green"}
  ]; 

  // reset collection
  db.collection('slogans').drop();

  db.collection('slogans').insertMany(slogansToStart)
      .then(result => {
          console.log(`inserted ${result.insertedIds.length} slogans!`);
      })
      .catch(err => console.error(`Failed to insert documents: ${err}`))


  // get endpoint
  app.get("/api/slogans", (req, res, next) => {
      db.collection('slogans').find({}).toArray()
          .then(items => {
              res.json({
                  "message":"success",
                  "data": items
              })
          })
          .catch(error => res.status(400).json({"error": error}));
      });

  // get on slogan
  app.get("/api/slogan/:id", (req, res, next) => {
    db.collection('slogans').findOne({id: req.params.id})
      .then(item => {
          res.json({
              "message":"success",
              "data": item
          })
      })
      .catch(error => res.status(400).json({"error": error}));
  });

  // add slogan I created this totally with asyn functions
  app.post("/api/slogan/", (req, res, next) => {
    if (!req.body.slogan) {
        res.status(400).json({"error": "No slogan specified"});
        return;
    }

    try {
      let item = insertOne(db, 'slogans', req.body.slogan);
      return res.json({
        "message":"success",
        "data": item
      });
    } catch (error) {
      res.status(400).json({"error": error})
    }
  });


  //update slogan
  app.put("/api/slogan/:id", (req, res, next) => {
    if (!req.body.slogan) {
        res.status(400).json({"error": "No slogan specified"});
        return;
    }

    const idToUpdate = (req.params.id)*1;

    db.collection('slogans').updateOne(
      {"id": idToUpdate}, 
      {$set: {"id": idToUpdate, "slogan": req.body.slogan}}
    )
      .then(item => {
        res.json({
            "message":"success",
            "data": item
        })
      })
      .catch(error => res.status(400).json({"error": error}));
  })

  // delete slogan
  app.delete("/api/slogan/:id", (req, res, next) => {
    const idToUpdate = (req.params.id)*1;

    db.collection('slogans').deleteOne({"id": idToUpdate})
      .then(item => {
        res.json({
            "message":"success",
            "data": item
        })
      })
      .catch(error => res.status(400).json({"error": error}));
  })

});


// async functions more easy to open/close for every operation if needed
async function insertOne(db, collection, slogan){
  let collectionCount = await db.collection(collection).find({}).count()

  let result = await db.collection(collection).insertOne({id: (collectionCount + 1), slogan: slogan});
  return result;
}
