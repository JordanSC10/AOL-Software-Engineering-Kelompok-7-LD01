// backend/db.js
// Contoh koneksi MongoDB dengan Mongoose

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gearshare';

function connectDB() {
  mongoose.set('strictQuery', false);

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log(`MongoDB connected: ${MONGO_URI}`);
  });

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
}

module.exports = connectDB;
