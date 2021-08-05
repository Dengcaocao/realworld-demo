const { articleModel } = require('../model')

// List Articles
exports.listArticles = async (req, res) => {
  const { offset = 0, limit = 10 } = req.query
  let queryObj = {}
  for (let i in req.query) {
    if (i !== 'offset' && i !== 'limit') {
      if (i === 'tag') {
        queryObj.tagList = req.query[i]
      } else {
        queryObj[i] = req.query[i]
      }
    }
  }
  const count = await articleModel.find(queryObj).count()
  const article = await articleModel.find(queryObj).skip(parseInt(offset)).limit(parseInt(limit))
  res.status(200).send({
    articles: article,
    total: count
  })
}

// Feed Articles
exports.feedArticles = (req, res) => {
  res.send('Feed Articles')
}

// Get Article
exports.getArticle = async (req, res, next) => {
  try {
    const { slug } = req.params
    const article = await articleModel.findById(slug).populate('author')
    if (!article) {
      return res.status(404).send('未查询到相关文章')
    }
    res.status(200).send(article)
  } catch(err) {
    next(err)
  }
}

// Create Article
exports.createArticle = async (req, res, next) => {
  try{
    let article = new articleModel(req.body.article)
    article.author = req.user._id
    article.populate('author').execPopulate()
    article = await article.save()
    res.status(200).send(article)
  } catch(err) {
    next(err)
  }
}

// Update Article
exports.updateArticle = (req, res) => {
  res.send('Update Article')
}

// Delete Article
exports.deleteArticle = (req, res) => {
  res.send('Delete Article')
}

// Add Comments to an Article
exports.addCTA = (req, res) => {
  res.send('Add Comments to an Article')
}

// Get Comments from an Article
exports.getCFA = (req, res) => {
  res.send('Get Comments from an Article')
}

// Delete Comment
exports.deleteComment = (req, res) => {
  res.send('Delete Comment')
}

// Favorite Article
exports.favoriteArticle = (req, res) => {
  res.send('favoriteArticle')
}

// Favorite Article
exports.unfavoriteArticle = (req, res) => {
  res.send('Unfavorite Article')
}

// Get Tags
exports.getTags = (req, res) => {
  res.send('Get Tags')
}
