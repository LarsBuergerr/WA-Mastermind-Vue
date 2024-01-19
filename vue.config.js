const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.Node_ENV === 'production' ? '/WA-Mastermind-Vue/' : '/',
  transpileDependencies: true
})
