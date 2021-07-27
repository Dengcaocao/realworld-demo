const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const handleError = require('./middleware/handle-errorr')

const app = express()

// 获取表单请求体
app.use(express.json())
app.use(express.urlencoded())

// 解决跨域
app.use(cors())

// 日志打印
app.use(morgan('dev'))

// 路由
app.use('/api', router)

// 错误中间件
app.use(handleError())

app.listen(4180, () => {
  console.log('server running at localhost:4180')
})
