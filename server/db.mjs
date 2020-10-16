import mongodb from 'mongodb';

// mongodb connectionstring
const connectionString = 'mongodb://localhost:27017/slogans';

const connectDb = () => {
  return mongodb.MongoClient.connect(connectionString)
};
   
export { connectDb };
   