const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: { 
    secure: false, // Set to false for testing
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 3600000 // cookie akan disimpan selama 1 jam
  }
});

module.exports = sessionMiddleware;

