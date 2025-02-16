const express = require('express');
// Import and require express-session
const session = require('express-session');
const routes = require('./routes');
var cors = require('cors');
const { connectToDB } = require('./db');

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
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  connectToDB();
});
