import 'dotenv/config';
import mongoose from 'mongoose';
import chalk from 'chalk';

const mongoConnect = async uri => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Djinndex cluster connected: ' + chalk.cyan('https://cloud.mongodb.com/v2/5e4d7b4366f371102c022635'));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default mongoConnect;
