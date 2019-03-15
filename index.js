const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const app = express();

const mainRoute = require('./routes/index');
const articles = require('./routes/articles');
const user = require('./routes/user');

require('./config/passport')(passport);

app.engine('html', exphbs({
  defaultLayout: 'main',
  extname: '.html',
  layoutsDir: path.join(__dirname, '/dist/layouts'),
  partialsDir: [
    'dist/partials/'
  ]
}))

app.set('view engine', 'html');
app.set("views", path.join(__dirname, '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/articles', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(express.static('dist'));

app.use('/', mainRoute);
app.use('/articles', articles);
app.use('/user', user);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});