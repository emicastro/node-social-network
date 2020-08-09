const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index.js')

const router = express.Router()

// Routes
router.get('/', list)
router.post('/follow/:id', secure('follow'), follow)
router.get('/:id', get)
router.post('/', upsert)
router.put('/:id', secure('update'), upsert)

// Internal function
function list(req, res, next) {
  Controller.list()
    .then((usersList) => {
      response.success(req, res, usersList, 200)
    })
    .catch(next)
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

router.delete('/:id', (req, res, next) => {
  Controller.remove(req.params.id)
    .then((userId) => {
      response.success(req, res, userId, 200)
    })
    .catch(next)
})

module.exports = router
