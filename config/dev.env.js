'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/dev"',
  CLIENT_ID: '"3"',
  CLIENT_SECRET: '"PRfo71CxX4IOh0gdUCDxZmlLGure0TaDqR1URlR5"'
})