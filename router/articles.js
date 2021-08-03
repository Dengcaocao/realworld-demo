const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const article = require('../validate/articles-v')

const {
  listArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addCTA,
  getCFA,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
  getTags

} = require('../contorller/articles')

// listArticles
router.get('/articles', listArticles)

// feedArticles
router.get('/articles/feed', feedArticles)

// getArticle
router.get('/articles/:slug', getArticle)

// createArticle
router.post('/articles', auth, article.createArticle, createArticle)

// updateArticle
router.put('/articles/:slug', updateArticle)

// deleteArticle
router.delete('/articles/:slug', deleteArticle)

// addCTA
router.post('/articles/:slug/comments', addCTA)

// getCFA
router.get('/articles/:slug/comments', getCFA)

// deleteComment
router.delete('/articles/:slug/comments/:id', deleteComment)

// favoriteArticle
router.post('/articles/:slug/favorite', favoriteArticle)

// unfavoriteArticle
router.delete('/articles/:slug/favorite', unfavoriteArticle)

// getTags
router.get('/tags', getTags)

module.exports = router
