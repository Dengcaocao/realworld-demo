const { userModel } = require('../model')
// 登录
exports.login = async (req, res, next) => {
  try {
    res.send('登录')
  } catch(err) {
    next(err)
  }
}

// 注册
exports.register = async (req, res, next) => {
  try {
    /**
     * 1. 获取请求体
     * 2. 验证数据
     * 3. 验证通过，将数据保存到数据库
     * 4. 响应成功状态码
     */
    let user = new userModel(req.body.user)
    user.save().then(() => {
      user = user.toJSON()
      delete user.password
      res.status(200).send(user)
    })
  } catch(err) {
    next(err)
  }
}

// 获取当前用户
exports.currentUser = (req, res) => {
  res.send('获取当前用户')
}

// 更新用户
exports.updateUer = (req, res) => {
  res.send('更新用户')
}
