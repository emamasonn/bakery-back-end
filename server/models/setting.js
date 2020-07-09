let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let attentionSchema = new Schema({
        monday:{
            type: String,
        },
        tuesday: {
            type: String
        },
        wednesday: {
            type: String
        },
        thursday: {
            type: String
        },
        friday: {
            type: String
        },
        saturday: {
            type: String
        },
        sunday: {
            type: String
        },    
})

let settingSchema = new Schema({
        name: { 
            type: String, 
            required: [true, 'The name is necessary'] 
        },
        linkFb: { 
            type: String, 
        },
        linkIng: { 
            type: String, 
        },
        directionCoordinates: { 
            type: String, 
        },
        direction: { 
            type: String, 
        },
        attentionSchedule: {
            type: {attentionSchema}
        },
        telephone: {
            type: String
        },
        email: {
            type: String
        },
        notas: {
            type: String
        } 
});


module.exports = mongoose.model('Setting', settingSchema);