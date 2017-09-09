'use strict';

const
  debug = require('debug')('kshell:upvote-router'),
  createError = require('http-errors'),
  jsonParser = require('body-parser').json(),
  Router = require('express').Router,
  bearerAuth = require('../lib/bearer-auth-middleware.js'),
  Profile = require('../model/profile.js'),
  Folder = require('../model/folder.js'),
  File = require('../model/file.js'),

  folderRouter = module.exports = Router();

folderRouter.post('/api/rootfolder', bearerAuth, jsonParser, function(req, res, next){
  debug('POST: /api/rootfolder');

  if(!req._body) return next(createError(401, 'request body expected')); 

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    req.body.name = '$'+req.user.username;
    req.body.posterPID = profile._id;
    req.body.parent = profile._id;
    req.body.path = req.body.name;
    req.body.parents = profile._id;
    req.body.parentspath = [profile.path];
    console.log('body', req.body);
    new Folder(req.body).save()
    .then( folder => {
      profile.root = folder._id;
      return profile.save();
    })
    .then( profile => {
      return Folder.findById(profile.root)
      .then( root => res.json(root));
    })
  })
  .catch(next);
});

// folderRouter.post('/api/folder/:folderID', bearerAuth, jsonParser, function(req, res, next) {
//   debug('GET: /api/folder/:folderID');

//   if(!req._body) return next(createError(401, 'request body expected'));

//   Profile.findOne({ userID: req.user._id})
//   .then( profile => {
//     return Folder.findById( req.params.folderID)
//     .then( folder => {
//       req.postedID = folder._id;
//       req.body.posterPID = profile._id;
//       req.body.path = folder.path+'/'+req.body.name;
//       req.body.parents = [...folder.parents, folder._id];
//       req.body.parentspath = [...folder.parentspath, folder.path];
//       return new Folder(req.body).save()
//       .then( newfolder => {
//         folder.folders.push(newfolder._id);
//         return folder.save();
//       })
//       .then( folder => {
//         return Folder.findById(folder._id)
//         .populate('folders')
//         .populate('files')
//       })
//       .then( folder => res.json(folder));
//     })
//   })
//   .catch(next);
// });

folderRouter.post('/api/folder', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/folder');

  if(!req._body) return next(createError(401, 'request body expected'));

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    console.log('req.body', req.body.path);
    return Folder.findOne({ path: req.body.path})
    .then( folder => {
      console.log('BDOY', req.body);
      console.log('folder', folder);
      req.body.parent = folder._id;
      req.body.posterPID = profile._id;
      console.log('1',req.body);
      req.body.path = folder.path+'/'+req.body.name;
      console.log('2',req.body.path);
      req.body.parents = [...folder.parents, folder._id];
      console.log('3', req.body.parents)
      console.log('BODY<>', req.body);
      return new Folder(req.body).save()
      .then( newfolder => {
        folder.folders.push(newfolder._id);
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


folderRouter.get('/api/folder/:id', function(req, res, next) {
  debug('GET: /api/folder/:id');

  Folder.findById(req.params.id)
  .populate('folders')
  .populate('files')
  .then( folder => res.json(folder))
  .catch(next);
});

folderRouter.post('/api/folderpath', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/folderpath');

  if(!req._body) return next(createError(401, 'request body expected'));

  console.log('BODY', req.body.path);

  Folder.findOne({path: req.body.path})
  .populate('folders')
  .populate('files')
  .then( folder => res.json(folder))
  .catch(next);
});




folderRouter.delete('/api/folder/deletefolder/:folderID', bearerAuth, function(req, res, next){
  debug('DELETE: /api/folder/deletefolder/:folderID');

  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    req.profileID = profile._id;
    return Folder.remove({ posterPID: req.profileID, parents: req.param.folderID})
  })
  .then( () => {
    return File.remove({ posterPID: req.profileID, parents: req.params.folderID});
  })
  .then( () => {
    return Folder.findOneAndRemove({ posterPID: req.profileID, _id: req.params.folderID});
  })
  .then( () => res.status(304).send('successfuly deleted'))
  .catch(next)
});

