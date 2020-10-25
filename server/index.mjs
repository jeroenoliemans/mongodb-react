import express from 'express';
import {connectDb, prepareDb} from './db.mjs';

const app = express();
// server port
const HTTP_PORT = 3030;

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

  // connect and prepare mongodb
  const db = client.db('slogans');
  prepareDb(db);

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

  // add slogan I created this with asyn functions
  app.post("/api/slogan/", (req, res, next) => {
    if (!req.body.slogan) {
        res.status(400).json({"error": "No slogan specified"});
        return;
    }

    try {
      let insertedItem = insertOne(db, 'slogans', req.body.slogan);

      return res.json({
        "message":"success",
        "data": insertedItem
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

// async functions more to use when multiple async ops are required
const insertOne = async (db, collection, slogan) => {
  let collectionCount = await db.collection(collection).find({}).count()
  return await db.collection(collection).insertOne({id: (collectionCount + 1), slogan: slogan});
}

// kill the connection when the server stops
process.on('SIGINT', function() {
  db.close()
    .then(() => {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    })
});