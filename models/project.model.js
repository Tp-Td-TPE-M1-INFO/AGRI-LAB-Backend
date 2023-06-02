const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const projectSchema = new mongoose.Schema({
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
    images:{
        type: String,
        default: 'profil/profil.png'
    },
    token:{
        type : String,
        required: true
    }
},
{
    timestamps: true
}); 

projectSchema.methods .generateToken = async function(){
     const authToken = jwt.sign({ _id: this._id.toString()}, process.env.TOKEN_SECRET,{
        expiresIn: 30*24*60*60*1000,
      });
      this.token=authToken;
      await this.save();
      return authToken
}

module.exports = mongoose.model('Project', projectSchema);   