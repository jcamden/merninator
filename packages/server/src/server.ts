import './config/database';

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';

import { corsOptions } from './config/corsOptions';
// import { configPassport } from './config/passport';
import { consoleLogo } from './lib/consoleLogo';
import { router } from './routes/routes';

// import { readFileSync } from 'fs';
// import https from 'https';
// import { join, resolve } from 'path';

// init Express application
const app = express();

// init middleware
app.use(cors(corsOptions));
// app.use('/files', express.static(join(__dirname, './public')));
// frikkin apidoc index.html file won't get served
// app.get('/api/docs', function (req, res) {
//     res.sendFile(__dirname + '/docs/api/index.html');
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init passport
// pass the global passport object into the configuration function
// configPassport(passport);
// init passport object on every request
// app.use(passport.initialize());

// init routes
app.use(router);
// app.get('/*', (req, res) => {
//     console.log("Shouldn't it really be, like, a 404?");
//     res.send("Shouldn't it really be, like, a 404?");
// });

const isProd = process.env.NODE_ENV === 'prod';
const isBuilt = process.env.NODE_ENV === 'built';
const isDev = process.env.NODE_ENV === 'dev';

// error handler
const errorHandler = (err, req, res) => {
    res.status(500);
    res.render('error', { error: err });
};

app.use(errorHandler);

// const httpsPort = 5000;
const httpPort = process.env.PORT || 5000;

app.listen(httpPort, () => {
    consoleLogo();
    console.log(
        isProd
            ? chalk.green('Production Environment')
            : isBuilt
            ? chalk.magenta('Development Environment (Built)')
            : isDev
            ? chalk.yellow('Development Environment')
            : chalk.red('specify NODE_ENV: dev|built|prod in .env'),
    );
    console.log(
        isProd
            ? 'http (local, GAE => https) prod server running on port ' + chalk.cyan(`${httpPort}`)
            : isBuilt
            ? 'http (local, GAE => https) built server running at ' + chalk.cyan(`https://localhost:${httpPort}`)
            : isDev
            ? 'http (local, GAE => https) dev server running at ' + chalk.cyan(`https://localhost:${httpPort}`)
            : chalk.red('specify NODE_ENV: dev|built|prod in .env'),
    );
});

// const httpsOptions = {
//     key: readFileSync(resolve(__dirname, './security/ssl/cert.key')),
//     cert: readFileSync(resolve(__dirname, './security/ssl/cert.pem')),
// };

// !isProd &&
//     https.createServer(httpsOptions, app).listen(httpsPort, () => {
//         console.log(
//             isProd
//                 ? 'https (local) prod server running on port ' + chalk.cyan(`${httpsPort}`)
//                 : isBuilt
//                 ? 'https (local) built server running at ' + chalk.cyan(`https://localhost:${httpsPort}`)
//                 : isDev
//                 ? 'https (local) dev server running at ' + chalk.cyan(`https://localhost:${httpsPort}`)
//                 : chalk.red('specify NODE_ENV: dev|built|prod in .env'),
//         );
//     });
