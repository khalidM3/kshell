'use strict';

const
  debug = require('debug')('projextX:error-middleware'),
  createError = require('http-errors');

module.exports = function(err, req, res, next){
  debug('error middleware');

  if(err.status){
    res.status(err.status).send(err.message);
    next();
    return;
  }

  if(err.name === 'ValidationError'){
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'CastError' || err.name === 'TypeError'){
    err = createError(404, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
  return;
};