const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
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
        default: '../profil/profil.png'
    },
    role:{
        type: String,
        default: "investor"
    }
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Investor', investorSchema);