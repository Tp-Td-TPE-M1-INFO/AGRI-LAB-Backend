const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    
    phoneNumber: {
        type : String,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'public/profil/profil.jpg'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('farmer', farmerSchema);