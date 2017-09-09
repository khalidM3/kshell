'use strict';

const
  debug = require('debug')('kayforum-BE:profile-router'),
  createError = require('http-errors'),
  Router = require('express').Router,
  jsonParser = require('body-parser').json(),

  bearerAuth = require('../lib/bearer-auth-middleware.js'),
  Profile = require('../model/profile.js'),
  Folder = require('../model/folder.js'),
  File = require('../model/file.js'),

  profileRouter = module.exports = Router();


profileRouter.post('/api/profile', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/profile');

  if (!req._body) return next(createError(400, 'request body expected'));
  req.body.userID = req.user._id;
  new Profile(req.body).save()
  .then( profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/profile', bearerAuth, function(req, res, next) {
  debug('GET: /api/profile');

  Profile.findOne( {userID: req.user._id })
  .then( profile =>  {
    return Folder.findById(profile.root)
  })
  .then( root => res.json(root))
  .catch(next);
});

profileRouter.put('/api/profile/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT: /api/profile/:id');

  if (req._body !== true) return next(createError(400, 'nothing to update'));

  Profile.findOneAndUpdate({userID: req.params.id}, req.body, { new: true } )
    .then( profile => res.json(profile))
    .catch(next);
});


profileRouter.delete('/api/profile/:id', bearerAuth, function(req, res, next) {
  debug('DELETE: /api/profile/:id');
});
