const express = require('express')
const router = express.Router()

const { login, register, currentUser, updateUer } = require('../contorller/user')
const validate = require('../validate/user-v')

// 登录
router.post('/users/login', login)

// 注册
router.post('/users', validate.register, register)

// 获取当前用户
router.get('/user', currentUser)

// 更新用户
router.put('/user', updateUer)

module.exports = router
