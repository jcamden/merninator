import express from 'express';
import passport from 'passport';
import configure from './config/passport';
import router from './routes/index';
import './config/database';
import consoleLogo from './lib/consoleLogo';
import chalk from 'chalk';

// Create the Express application
const app = express();

// Pass the global passport object into the configuration function
configure(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Imports all of the routes from ./routes/index.j
app.use(router);

const port = 5000;

app.listen(port, () => {
  consoleLogo();
  console.log(`Djinndex server running at: ` + chalk.cyan(`https://localhost:${port}`));
});
