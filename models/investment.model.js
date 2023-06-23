const mongoose = require('mongoose');

const investmentSchema = mongoose.Schema({
    investor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investor",
        required: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    money:{
        type: Number,
        required: true
    },
    description:{
        type: String,
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Investment", investmentSchema)