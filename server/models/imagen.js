const mongoose = require('mongoose')
const Schema = mongoose.Schema

let imagenSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The name of imagen is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    extension: {
        type: String,
    },
})


module.exports = mongoose.model('Imagen', imagenSchema);

