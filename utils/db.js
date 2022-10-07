const mongoose = require('mongoose');

// const DB = process.env.DATABASE_URI;
const DB = "mongodb://localhost:27017/chirp";

const connectDB = () => {
   mongoose.connect(DB , {
      useUnifiedTopology : true ,
      useNewUrlParser : true ,
   }).then(() => console.log('Database connected.'))
   .catch(err => console.log('Database connection failed. ' , err))
}

module.exports = connectDB ;