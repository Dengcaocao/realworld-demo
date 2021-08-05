const jwt = require('../utils/jwt')
const { jwtSecret } = require('../config/config.default')
const { userModel } = require('../model/index')

module.exports = async (req, res, next) => {
  // 获取token
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
  if (!token) {
    return res.status(401).send('身份认证失败！！！')
  }

  try {
    const decodeToken = await jwt.verify(token, jwtSecret)
    req.user = await userModel.findById(decodeToken.userId)
    next()
  } catch (err) {
    res.status(401).send('身份认证失败！！！')
  }
}