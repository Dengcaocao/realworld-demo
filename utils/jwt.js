const jwt = require('jsonwebtoken')

module.exports = {
  sign: jwt.sign,
  veridy: jwt.verify
}
