const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const projectSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
        type : String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    files:{
        type: [String],
    }
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Project', projectSchema);   