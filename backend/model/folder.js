'use strict';

const
  mongoose = require('mongoose'),

  folderSchema = mongoose.Schema({
    posterPID: {type: mongoose.Schema.Types.ObjectId},
    parent: {type: mongoose.Schema.Types.ObjectId},
    name: { type: String },
    path: { type: String },
    parents: [{ type: mongoose.Schema.Types.ObjectId}],
    parentpath: [{ type: String }],
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'folder' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }],
    created: { type: Date, default: Date.now}
  });

module.exports = mongoose.model('folder', folderSchema);