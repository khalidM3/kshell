'use strict';

const
  mongoose = require('mongoose'),

  profileSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String },
    root: { type: mongoose.Schema.Types.ObjectId },
    created: {type: Date, default: Date.now}
  });

module.exports = mongoose.model('profile', profileSchema);
