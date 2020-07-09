const express = require('express')
const app = express()
 
app.use(require("./category"))
app.use(require("./product"))
app.use(require("./upload"))
app.use(require("./imagenes"))
app.use(require("./order"))
app.use(require("./account"))
app.use(require("./message"))

module.exports = app;