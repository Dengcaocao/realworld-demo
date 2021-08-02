const mongoose = require('mongoose')
const sha1 = require('../utils/sha1')

const userSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: []
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  // author: {

  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = userSchema
