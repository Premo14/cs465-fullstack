const createError = require('http-errors');
const express = require('express');
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

const app = express();

// Register handlebars helpers
handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  if (options === undefined) {
    options = v2;
    v2 = operator;
    operator = "==";
  }

  const { fn, inverse } = options;
  switch (operator) {
    case '<':
      return (v1 < v2) ? fn(this) : inverse(this);
    default:
      return inverse(this);
  }
});

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.currentPage = req.path.substring(1);
  next();
});

handlebars.registerHelper('eq', function(arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack); // Log the error to the console
  res.status(500).render('error', { error: err }); // Render an error page using Handlebars
});

module.exports = app;
