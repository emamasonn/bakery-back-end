const { port, urlDB } = require("./config/config")

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(require("./routes/index"))

mongoose.connect(urlDB,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true }, 
    (err, res) => {
    if (err) throw err

    console.log("base de datos online")
})

app.listen(port, () => {
    console.log("Escuchando el puerto: ", port)
})