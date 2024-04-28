"use strict"

const { merge } = require("webpack-merge")

const common = require("./webpack.common.js")
const PATHS = require("./paths")

common.module.rules.push({
  resolve: {
    extensions: [".ts", ".js"]
  }
})

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    main: PATHS.src + "/main.ts"
  }
})

module.exports = config
