const express = require('express')

const response = require('./../../../network/response')
const Controller = require('./index')

const router = express.Router()

// TODO: Create the remaining functions to create a post, edit a post and get a post by id

// Routes
router.get('/', list)

// Internal functions
function list(req, res, next) {
  Controller.list()
    .then(data => response.success(req, res, data, 200))
    .catch(next)
}

module.exports = router
