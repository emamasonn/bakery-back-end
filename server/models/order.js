let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderProduct = new Schema({
    name: {
        type: String,
    },
    quality: {
        type: Number,
    },
    priceUni: {
        type: Number,
    }
})

let orderSchema = new Schema({
        name: { 
            type: String, 
            required: [true, 'The name is necessary'] 
        },
        lastName: { 
            type: String, 
            required: [true, 'The lastname is necessary'] 
        },
        address: { 
            type: String, 
            required: [true, 'The address is necessary']
        },
        departament: {
            type: String,
        },
        location: {
            type: String,
        },
        telephone: {
            type: String,
        },
        email: {
            type: String,
        },
        description: {
            type: String,
            required: [true, 'The description is necessary']
        },
        available: { 
            type: Boolean,  
            default: true 
        },
        products: {
            type: [orderProduct],
        }
});


module.exports = mongoose.model('Order', orderSchema);