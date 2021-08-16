const validate = require('../middleware/validate')
const { body, param } = require('express-validator')
// const mongoose = require('mongoose')
const { articleModel } = require('../model')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空'),
])

exports.articleId = validate([
  validate.checkArticleID(['params'], 'slug')
])

exports.updateArticle = [
  validate([
    validate.checkArticleID(['params'], 'slug')
  ]),
  /**
   * 判断文章是否存在
   * 判断当前用户是否有权修改
   */
  async (req, res, next) => {
    const articleId = req.params.slug
    const article = await articleModel.findById(articleId)
    if(!article) {
      return res.status(404).send('没有该文章数据')
    }
    req.article = article
    next()
  },
  async (req, res, next) => {
    if(req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).send('你没有权限修改此文章！！！')
    }
    next()
  }
]

exports.deleteArticle = exports.updateArticle
