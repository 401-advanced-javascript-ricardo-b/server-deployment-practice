'use strict';

//libraries
require('dotenv').config();
const express = require('express');
const app = express();

//local files
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');
const stamper = require('./middleware/stamper')

//routes
app.get('/', renderHome);
app.get('/data', stamper, renderData);
app.get('/bad', (req, res, next)=>{
  //anything in next() results in thrown error
  next('there was an issue...and it\'s you');
})
app.use('*', notFoundHandler)

//when an error is thrown
app.use(errorHandler);

//callback functions
function renderHome(req, res){
  res.status(200).send('Hello World');
}

function renderData(req, res, next){
  const outputObj = {
    222: "even",
    223: "odd", 
    "time": req.timeStamp
  }
  res.status(200).json(outputObj);
}

//Server up
function start(PORT){
  app.listen(PORT, () => console.log(`listening on ${PORT}`))
}

module.exports = {
  app: app,
  start: start
}