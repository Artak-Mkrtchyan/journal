const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');

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


app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', mainRoute);
app.use('/api/articles', articles);
app.use('/api/user', user);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
