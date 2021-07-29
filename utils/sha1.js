const crypto = require('crypto')

module.exports = str => {
  return crypto.createHash('sha1').update(str).digest('hex')
}
