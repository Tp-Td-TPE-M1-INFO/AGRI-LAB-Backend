const mongoose = require('mongoose')

const weightSchema = mongoose.Schema({

    recommander:[{
        investor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
            required: true
        },
        project:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        criteriaWeights:[{
           type: Number
        }]
    }]
});

module.exports = mongoose.model('weight', weightSchema);