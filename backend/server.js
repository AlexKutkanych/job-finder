const express = require('express');
// Import and require express-session
const session = require('express-session');
const routes = require('./controllers');
var cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

// Express middlewares
app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => console.log('Now listening', PORT));
