const validate = require('../middleware/validate')
console.log(validate)
const { body } = require('express-validator')
const { userModel } = require('../model')
exports.register = validate([
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async val => {
      const data = await userModel.findOne({
        username: val
      })
      if (data) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async val => {
      const data = await userModel.findOne({
        email: val
      })
      if (data) {
        return Promise.reject('邮箱已存在')
      }
    }),
  body('user.password').notEmpty().withMessage('密码不能为空')
])