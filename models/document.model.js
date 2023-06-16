const mongoose = require('mongoose');

const DocSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique : true
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