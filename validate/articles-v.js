const validate = require('../middleware/validate')
const { body, param } = require('express-validator')
const mongoose = require('mongoose')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空'),
])

exports.articleId = validate([
  param('slug').custom(async val => {
    if(!mongoose.isValidObjectId(val)) {
      return Promise.reject('请传入正确文章id！')
    }
  })
])
