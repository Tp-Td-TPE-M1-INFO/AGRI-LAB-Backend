const mongoose = require('mongoose')

const weightSchema = mongoose.Schema({

    recommander:[{
        project:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        investor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
            required: true
        },
        weight:[{
           type: Number
        }]
    }]
});

module.exports = mongoose.model('weight', weightSchema);