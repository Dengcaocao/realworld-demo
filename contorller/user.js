const { userModel } = require('../model')
// 登录
exports.login = async (req, res, next) => {
  try {
    let user = JSON.stringify(req.user)
    user = JSON.parse(user)
    delete user.password
    res.send(user)
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
exports.currentUser = async (req, res, next) => {
  try {
    res.send('获取当前用户')
  } catch (err) {
    next(err)
  }
}

// 更新用户
exports.updateUer = async (req, res, next) => {
  try {
    console.log(req.body)
    // let arr = []
    // for(let i in req.body.user) {
    //   console.log(i)
    // }
    const updateUser = userModel.updateOne({_id: '6103b77188e2fad6574cde91'}, {$set: req.body.user})
    res.send(updateUser)
  } catch (err) {
    next(err)
  }
}
