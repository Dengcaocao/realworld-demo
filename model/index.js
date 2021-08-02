const mongoose = require('mongoose')
const userSchema = require('./user')
mongoose.connect('mongodb://localhost/mongooseTest',{  //解决警告问题
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('open', () => {
  console.log('数据库连接成功')
})

db.on('error', () => {
  console.log('数据库连接失败')
})

module.exports = {
  userModel: mongoose.model('user', require('./user')),
  articleModel: mongoose.model('articles', require('./articles-m'))
}
