const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.Node_ENV === 'production' ? '/mastermind-vue/' : '/',
  transpileDependencies: true
})
