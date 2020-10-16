const MongoClient = require('mongodb').MongoClient;

// mongodb connectionstring
const connectionString = 'mongodb://localhost:27017/slogans';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
  };
   
export { connectDb };
   