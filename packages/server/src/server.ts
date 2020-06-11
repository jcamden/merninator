import express from 'express';
import mongoConnect from './services/mongoConnect';
import https from 'https';
import { readFileSync } from 'fs';
import consoleLogo from './utils/consoleLogo';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';
import { resolve, join } from 'path';
import chalk from 'chalk';

const app = express();

// middleware options
const customCorsOptions = {
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  origin: 'http://localhost:3000',
  // preflightContinue: true,
};

// init middleware
app.use(cors(customCorsOptions));
app.use(express.static(__dirname + '/public'));
app.use(express.json({ extended: false, limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(passport.initialize());
require('./services/localStrategy');
require('./services/jwtStrategy');
require('./services/googleStrategy');
// require('./services/facebookStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const mongoURI = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Your IP is not whitelisted for my MongoDB collection.
// Change the URI in ./db/db to point to your own collection.
mongoConnect(mongoURI);

// routes
app.use('/', routes);
app.use('/public', express.static(join(__dirname, '../public')));

const port = process.env.PORT || 5000;

const httpsOptions = {
  key: readFileSync(resolve(__dirname, '../security/cert.key')),
  cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
};

const server = https.createServer(httpsOptions, app).listen(port, () => {
  consoleLogo();
  console.log(`Djinndex server running at ` + chalk.cyan(`https://localhost:${port}`));
});
