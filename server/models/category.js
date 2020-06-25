const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The name of category is required']
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'The description is required']
    },
})


module.exports = mongoose.model('Category', categorySchema);