'use strict';

const
  Router = require('express').Router,
  jsonParser = require('body-parser').json(),
  debug = require('debug')('k-project:auth-route'),
  createError = require('http-errors'),
  basicAuth = require('../lib/basic-auth-middleware.js'),
  User = require('../model/user.js'),

  authRouter = module.exports =  Router();


authRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('/api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);
  user.genPasswordHash(password)
  .then( user => user.save())
  .then( user => user.genToken())
  .then( token => res.send(token))
  .catch(err => next(createError(400, err.message)));
});

authRouter.get('/api/login', basicAuth, (req, res, next) => {
  debug('/api/login');

  let response = {};

  User.findOne({username : req.auth.username})
  .then( user => {
    return user.compPasswordHash(req.auth.password);
  })
  .then( user => {
    response.user = user;
    return user.genToken();
  })
  .then( token => {
    response.token = token;
    return res.send(response);
  })
  .catch(err => next(err));
});

authRouter.put('/api/account', jsonParser, basicAuth, (req, res, next) => {
  debug('/api/account');
  
  if(!req._body) return next(createError(400, 'Expected request body'));
  User.findOne({username: req.auth.username})
  .then( user => user.compPasswordHash(req.auth.password))
  .then( user => {
    if(!req.body.password){
      User.findByIdAndUpdate(user._id, req.body, {new: true})
      .then( user => res.json(user))
      .catch(err => next(err));
    }

    user.genPasswordHash(req.auth.password)
    .then( user =>  User.findByIdAndUpdate(user._id, req.body, {new: true}))
    .then( user => res.json(user))
    .catch(next);
  })
  .catch(next);
});