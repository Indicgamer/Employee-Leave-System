const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    casualLeaves:{
        number:{
            type: Number,
            required: true
        },
        lastLeave:{
            type: Date,
        }
    },
    earnedLeaves:{
        number:{
            type: Number,
            required: true
        },
        lastLeave:{
            type: Date,
        }
    },
    committedLeaves:{
        number:{
            type: Number,
            required: true
        },
        lastLeave:{
            type: Date,
        }
    }

});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;