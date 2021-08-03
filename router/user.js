const express = require('express')
const router = express.Router()

const { login, register, currentUser, updateUer } = require('../contorller/user')
const validate = require('../validate/user-v')
const auth = require('../middleware/auth')

// 登录
router.post('/users/login', validate.login, login)

// 注册
router.post('/users', validate.register, register)

// 获取当前用户
router.get('/user', auth, currentUser)

// 更新用户
router.put('/user', validate.update, updateUer)

module.exports = router
