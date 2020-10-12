// first create folder for Mongo db under root  `sudo mkdir -p /data/db`
// set Owner sudo chown -R $USER /data
// start mongo `mongod` and keep terminal open
// now install mongo client to interact with the db
// `sudo apt install mongodb-clients`
// to acces mongodb enter `mongo`  and `db` at the prompt to see the exisiting databases

// 
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/slogans', function (err, client) {
    if (err) throw err

    var db = client.db('slogans')

    var slogansToStart = [
        { id: '1', slogan: "Feed the Planet and It Will Nourish You."},
        { id: '2', slogan: "Mother Earth Is Going to Get Mean If You Don't Go Green"}
    ]; 

    db.collection('slogans').insertMany(slogansToStart, function(err, res) {
        if (err) throw err;
      });

    db.collection('slogans').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result);
    db.close();
    })
})