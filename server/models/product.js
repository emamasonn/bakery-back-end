let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let productSchema = new Schema({
        name: { 
            type: String, 
            required: [true, 'The name is necessary'] 
        },
        priceUni: { 
            type: Number, 
            required: [true, 'The price is necessary'] 
        },
        description: { 
            type: String, 
            required: [true, 'The description is necessary']
        },
        available: { 
            type: Boolean, 
            required: true, 
            default: true 
        },
        category: { 
            type: Schema.Types.ObjectId, 
            ref: 'Category', 
            required: true 
        },
        img: {
            type: Schema.Types.ObjectId, 
            ref: 'Imagen', 
            required: true 
        },
});


module.exports = mongoose.model('Product', productSchema);