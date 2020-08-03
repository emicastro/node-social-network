const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index.js')

const router = express.Router()

// Routes
router.get('/', getRoutes)
router.get('/:id', getRoute)
router.post('/', upsert)
router.put('/:id', secure('update'), upsert)

// Internal function
function getRoutes(req, res) {
  Controller.list()
    .then((usersList) => {
      response.success(req, res, usersList, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

function getRoute(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

router.delete('/:id', (req, res) => {
  Controller.remove(req.params.id)
    .then((userId) => {
      response.success(req, res, userId, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
})

module.exports = router
