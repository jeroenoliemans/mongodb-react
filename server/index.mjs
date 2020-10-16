// first create folder for Mongo db under root  `sudo mkdir -p /data/db`
// set Owner sudo chown -R $USER /data
// start mongo `mongod` and keep terminal open
// now install mongo client to interact with the db
// `sudo apt install mongodb-clients`
// to acces mongodb enter `mongo`  and `db` at the prompt to see the exisiting databases

// 
// const express = require('express');
import express from 'express';
const app = express();
// server port
const HTTP_PORT = 8044;
// client port
const CLIENT_HTTP_PORT = 3050;

// body parser
app.use(express.json);

// set headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // wildcard, only for localhost
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// start server
app.listen(HTTP_PORT, () => {
    console.log(`Example app listening at http://localhost:${HTTP_PORT}`)
  })
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"});
});

//start mongo


// MongoClient.connect(connectionString)
//     .then(client => {
//         const db = client.db('slogans')

//         const slogansToStart = [
//             { id: '1', slogan: "Feed the Planet and It Will Nourish You."},
//             { id: '2', slogan: "Mother Earth Is Going to Get Mean If You Don't Go Green"}
//         ]; 

//         // reset collection
//         // db.collection('slogans').drop();

//         // db.collection('slogans').insertMany(slogansToStart)
//         //     .then(result => {
//         //         console.log(`inserted ${result.insertedIds.length} slogans!`);
//         //     })
//         //     .catch(err => console.error(`Failed to insert documents: ${err}`))

//         // start server
//         app.listen(HTTP_PORT, () => {
//             console.log(`Example app listening at http://localhost:${HTTP_PORT}`)
//         })

//         // Default response for any other request
//         // app.use(function(req, res){
//         //     res.json({"status":"404"});
//         // });

//         // Root endpoint
//         app.get("/", (req, res, next) => {
//             res.json({"message":"Ok"});
//         });

//         // get endpoint
//         // app.get("/api/slogans", (req, res, next) => {
//         //     db.collection('slogans').find()
//         //         .then(items => {
//         //             res.json({
//         //                 "message":"success",
//         //                 "data": items
//         //             })
//         //         })
//         //         .catch(error => res.status(400).json({"error": error}));
//         //     });

//         //db.close();
//     })
//     .catch(err => console.error(`Failed to connect to mongo: ${err}`));




