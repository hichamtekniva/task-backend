const mongoose = require('mongoose');


// * CREATE SCHEMA 

const TaskSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Please provide the name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    completed: {
        type: Boolean,
        default: false,
        select:false
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)


