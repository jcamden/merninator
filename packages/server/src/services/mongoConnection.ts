import mongoose from 'mongoose';
import chalk from 'chalk';
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const mongoURI = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

const mongoConnection = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log(`MongoDB connected: ${chalk.cyan('https://cloud.mongodb.com/v2/5e4d7b4366f371102c022635')}`);

export default mongoConnection;
