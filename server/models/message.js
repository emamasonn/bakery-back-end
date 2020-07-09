let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name user is necessary']
    },
    lastName: {
        type: String,
        //required: [true, 'The lastname user is necessary']
    },
    email: {
        type: String,
        required: [true, 'The email is necessary']
    },
    telephone: {
        type: String,
    },
    answered:{
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
    },
})

module.exports = mongoose.model('Message', messageSchema);