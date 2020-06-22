const express = require('express')
const bodyParser = require('body-parser')

const swaggerUI = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()
const swaggerDoc = require('./swagger.json')

app.use(bodyParser.json())

// ROUTER
app.use('/api/user', user)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.listen(config.api.port, () => {
  console.log('API listening in port ', config.api.port)
})
