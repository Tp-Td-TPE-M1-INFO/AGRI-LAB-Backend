const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const investorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
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
    token:{
        type : String,
        required: true
    }
},
{
    timestamps: true
}); 

investorSchema.methods .generateToken = async function(){
     const authToken = jwt.sign({ _id: this._id.toString()}, process.env.TOKEN_SECRET,{
        expiresIn: 30*24*60*60*1000,
      });
      this.token=authToken;
      await this.save();
      return authToken
}

module.exports = mongoose.model('Investor', investorSchema);   