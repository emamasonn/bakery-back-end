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
            type: String,  
            required: [true, 'The category is necessary'] 
        },
        img: {
            type: Schema.Types.ObjectId, 
            ref: 'Imagen',
        },
});


module.exports = mongoose.model('Product', productSchema);