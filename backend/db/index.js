const mongoose = require('mongoose');

require('dotenv').config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE;
const uri = `mongodb+srv://${username}:${password}@cluster0.s80z7.mongodb.net/${dbName}`;

async function connectToDB() {
  try {
    await mongoose.connect(uri);
    console.log('You successfully connected to MongoDB!');
  } catch (err) {
    console.dir(err, 'DB connection failure');
  }
}

module.exports = { connectToDB };
