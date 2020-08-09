const express = require('express')

const response = require('./../../../network/response')
const Controller = require('./index')

const router = express.Router()

// TODO: Create the remaining functions to create a post, edit a post and get a post by id

// Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)

// Internal functions
function list(req, res, next) {
  Controller.list()
    .then(data => response.success(req, res, data, 200))
    .catch(next)
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then(post => response.success(req, res, post, 200))
    .catch(next)
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then(post => response.success(req, res, post, 201))
    .catch(next)
}

module.exports = router
