import mongodb from 'mongodb';

// mongodb connectionstring
const connectionString = 'mongodb://localhost:27017/slogans';

const connectDb = () => {
  return mongodb.MongoClient.connect(connectionString)
};
   
const prepareDb = (db) => {
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

};

export { connectDb, prepareDb };
   