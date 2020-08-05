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
    console.log(decoded)
    if (decoded.id !== owner) {
      throw error('Action not allowed.', 401)
    }
  }
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

function getToken(auth) {
  if (!auth) {
    throw error('Token is not coming.', 401)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 401)
  }

  let token = auth.replace('Bearer ', '')

  return token
}

module.exports = {
  sign,
  check
}
