'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.101.137.152:7300/mock/5da17f75c6b06e1658b920dc/base"',
})
