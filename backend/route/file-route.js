'use strict';

const
  debug = require('debug')('kayforum:upvote-router'),
  createError = require('http-errors'),
  jsonParser = require('body-parser').json(),
  Router = require('express').Router,
  bearerAuth = require('../lib/bearer-auth-middleware.js'),
  Profile = require('../model/profile.js'),
  Folder = require('../model/folder.js'),
  File = require('../model/file.js'),

  fileRouter = module.exports = Router();

fileRouter.post('/api/rootfile', bearerAuth, jsonParser, function(req, res, next){
  debug('POST: /api/rootfile');

  if(!req._body) return next(createError(401, 'request body expected')); 

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    req.body.posterPID = profile._id;
    req.body.parent = profile._id;
    req.body.path = req.user.username+'/'+req.body.name;
    req.body.parents = profile._id;
    new File(req.body).save()
    .then( file => {
      profile.files.push(file._id);
      return profile.save();
    })
    .then( profile => {
      return Profile.findById(profile._id)
      .populate('files')
      .populate('folders')
      .then( profile => res.json(profile))
    })
  })
  .catch(next);
});

fileRouter.post('/api/file', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/file');

  if(!req._body) return next(createError(401, 'request body expected'));

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    return Folder.findOne({ path: req.body.path})
    .then( folder => {
      req.parent = folder._id;
      req.body.posterPID = profile._id;
      req.body.path = folder.path+'/'+req.body.name;
      req.body.parents = [...folder.parents, folder._id];
      return new File(req.body).save()
      .then( newfile => {
        folder.files.push(newfile._id);
        return folder.save();
      })
      .then( folder => {
        return Folder.findById(folder._id)
        .populate('folders')
        .populate('files')
      })
      .then( folder => res.json(folder));
    })
  })
  .catch(next);
});


fileRouter.get('/api/file/:id', function(req, res, next) {
  debug('GET: /api/file/:id');

  File.findById(req.params.id)
  .then( file => res.json(file))
  .catch(next);
});

fileRouter.put('/api/filepath', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/file');

  File.findOne({ path: req.body.path})
  .then( file => res.json(file))
  .catch(next);
});

fileRouter.put('/api/savefile', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/savefile');

  File.findOneAndUpdate({ path: req.body.path}, req.body, {new: true})
  .then( file => res.json(file))
  .catch(next);
});



fileRouter.delete('/api/file/deletefile/:fileID', bearerAuth, function(req, res, next){
  debug('DELETE: /api/file/deletefile/:fileID');

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    return File.findOneAndRemove({ _id: req.params.fileID, posterPID: profile._id});
  })
  .catch(next)
});
