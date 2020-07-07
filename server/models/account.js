let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let accountSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name user is necessary']
    },
    lastName: {
        type: String,
        required: [true, 'The lastname user is necessary']
    },
    email: {
        type: String,
        required: [true, 'The email is necessary']
    },
    telephone: {
        type: String,
    },
    img: {
        type: Schema.Types.ObjectId, 
        ref: 'Imagen',
    },
})

module.exports = mongoose.model('Account', accountSchema);