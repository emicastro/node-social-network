const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const SECRET = config.jwt.secret

function sign(data) {
  return jwt.sign(data, SECRET)
}

function verify(token) {
  return jwt.verify(token, SECRET)
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req)
    console.log(decoder)
    if (decoded.id !== owner) {
      throw error('Action not allowed.', 401)
    }
  }
}

function decodeHeader(code) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

function getToken(auth) {
  if (!auth) {
    throw new Error('Token is not coming.')
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format')
  }

  let token = auth.replace('Bearer ', '')

  return token
}

module.exports = {
  sign,
  check
}
