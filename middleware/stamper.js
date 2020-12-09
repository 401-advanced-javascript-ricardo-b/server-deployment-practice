'use strict';

//middleware is good at adding things onto the request object

module.exports = (req, res, next) =>{
  //stops the request object adds a property called 'timestamp' with a value of new Date()
  req.timeStamp = new Date();

  //as long as no argument in next, it will move to next middleware argument
  next();
}