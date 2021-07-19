const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const app = express()

// 解决跨域
app.use(cors())

// 日志打印
app.use(morgan('dev'))

// 路由
app.use('/api', router)

app.listen(4180, () => {
  console.log('server running at localhost:4180')
})
