const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    
    fullname: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type : String,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    avatar:{
        type: String,
        default: 'profil/profil.png'
    },
    role:{
        type: String,
        default: "farmer"
    }
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Farmer', farmerSchema);   