import express from 'express';
import connectDB from '../config/db';
import consoleLogo from './utils/consoleLogo';
import fileUpload from 'express-fileupload';
import cors from 'cors';
// import path from "path";

const app = express();

// Your IP is not whitelisted for my MongoDB collection.
// Change the URI in ./db/db to point to your own collection.
connectDB();

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
app.use(fileUpload());

// routes
// app.use("/", require("./routes/index"));
app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/users', require('./routes//users/users'));
app.use('/api/uploads', require('./routes/uploads/uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  consoleLogo();
  console.log(`Server is running on PORT ${PORT}...`);
});
