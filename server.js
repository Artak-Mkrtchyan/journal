const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
// const session = require('express-session');

const app = express();

const mainRoute = require('./server/routes/index');
const articles = require('./server/routes/articles');
const user = require('./server/routes/user');

require('./server/config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/articles', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.join(__dirname, 'dist')));

const { ensureAuthenticated } = require('./server/helpers/auth');

app.use('/api', mainRoute);
app.use('/api/articles', articles);
app.use('/api/user', user);
//
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
