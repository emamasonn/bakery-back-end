const express = require('express')
const app = express()
 
app.use(require("./category"))
app.use(require("./product"))
app.use(require("./upload"))
app.use(require("./imagenes"))

module.exports = app;