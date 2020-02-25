'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://101.133.216.143:7300/mock/5e433e611d5d0c18e5dd14cb/base"',
})
