const mongoose = require('mongoose');

const DocSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    document: {
        type: String,
        required: true
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("Documents", DocSchema);