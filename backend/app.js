var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var expensesRouter = require('./routes/expenses.js');
var messagesRouter = require('./routes/messages.js')
var app = express();
///Summary: CORS must be configured early (near the top), 
// but only once. You currently have it twice remove the second one.
app.use(
  cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/api/expenses', expensesRouter);
app.use('/api/messages', messagesRouter);
module.exports = app;
