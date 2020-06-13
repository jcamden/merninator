import mongoose from 'mongoose';
import chalk from 'chalk';
/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * MONGO_URI_DEV=mongodb://<user>:<password>@localhost:27017/database_name
 * MONGO_URI_DEV_PROD=<your production database string>
 */

const devConnection = process.env.MONGO_URI_DEV;
const prodConnection = process.env.MONGO_URI_DEV_PROD;
console.log(`devConnectino: ${devConnection}`);

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`${prodConnection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });
} else {
  mongoose.connect(`${devConnection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected: ${chalk.cyan('https://cloud.mongodb.com/v2/5e4d7b4366f371102c022635')}`);
  });
}
