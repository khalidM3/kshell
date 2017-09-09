'use strict';

const
  mongoose = require('mongoose'),

  fileSchema = mongoose.Schema({
    posterPID: {type: mongoose.Schema.Types.ObjectId},
    parent: {type: mongoose.Schema.Types.ObjectId},
    name: { type: String },
    path: { type: String },
    parents: [{ type: mongoose.Schema.Types.ObjectId}],
    parentpath: [{ type: String }],
    content: { type: String },
    created: { type: Date, default: Date.now}
  });

module.exports = mongoose.model('file', fileSchema);