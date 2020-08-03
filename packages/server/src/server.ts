import './config/database';

import { readFileSync } from 'fs';
import https from 'https';
import { join, resolve } from 'path';

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import passport from 'passport';

import { corsOptions } from './config/corsOptions';
import { configPassport } from './config/passport';
import { consoleLogo } from './lib/consoleLogo';
import { router } from './routes/routes';

// init Express application
const app = express();

// init middleware
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init passport
// pass the global passport object into the configuration function
configPassport(passport);
// init passport object on every request
app.use(passport.initialize());

// init routes
app.use(router);

// error handler
const errorHandler = (err, req, res) => {
    res.status(500);
    res.render('error', { error: err });
};

app.use(errorHandler);

const isProduction = process.env.NODE_ENV === 'production';

// serve static assets if in production
if (isProduction) {
    // not sure about this, since I tend to use a public static folder as well
    app.use(express.static(join(__dirname, '../../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html'));
    });

    const port = process.env.PORT || 80;
    app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
    const port = process.env.PORT || 5000;

    const httpsOptions = {
        key: readFileSync(resolve(__dirname, '../security/ssl/cert.key')),
        cert: readFileSync(resolve(__dirname, '../security/ssl/cert.pem')),
    };

    https.createServer(httpsOptions, app).listen(port, () => {
        consoleLogo();
        console.log('https server running at ' + chalk.cyan(`https://localhost:${port}`));
    });
}
