const express = require('express');
const app = express()

require('dotenv').config();
require('./app_api/models/user')

const passport = require('passport');
require('./app_api/config/passport');
app.use(passport.initialize())

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('hbs');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const aboutRouter = require('./app_server/routes/about');
const contactRouter = require('./app_server/routes/contact');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

require('./app_api/models/db');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(function(req, res, next) {
  res.locals.currentPage = req.path.substring(1);
  next();
});

// Register handlebars helpers and views
handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  // Helper implementation
});
// Set views and partials
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// CORS middleware
app.use('/api', (res, req, next) => {
  // CORS headers
  next();
});

// Routes
app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);

// Error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"message": err.name + ": " + err.message});
  } else {
    next(err);
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
