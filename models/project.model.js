const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true
    },

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
    },
    surface: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    cultureType: {
        type : Number,
        required: true
    },
    technic:{
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },

    files:{
        type: [String],
    },
    investment :[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Investment"
    }]
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Project', projectSchema);   