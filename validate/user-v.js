const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { userModel } = require('../model')
const sha1 = require('../utils/sha1')

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

exports.login = [
  validate([
    body('user.email')
      .notEmpty().withMessage('邮箱不能为空')
      .bail()
      .isEmail().withMessage('邮箱格式不正确'),
    body('user.password')
      .notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email')
      .custom(async (email, { req }) => {
        const user = await userModel.findOne({email}, {email: 1, username: 1, bio: 1, image: 1, password: 1,})
        req.user = user
        if (!user) {
          return Promise.reject('用户不存在存在')
        }
      })
  ]),
  validate([
    body('user.password')
      .custom(async (password, { req }) => {
        if (sha1(password) !== req.user.password) {
          return Promise.reject('密码不正确')
        }
      })
  ])
]

exports.update = validate([
  body('user.email')
    .isEmail().withMessage('邮箱格式不正确')
])
