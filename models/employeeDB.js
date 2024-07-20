const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true,
        enum: ['Teaching', 'Non Teaching']
    },
    casualLeaves:{
        number:{
            type: Number,
            required: function(){
                if(this.Designation === 'Teaching'){
                    return true;
                }
                return false;
            }
        },
        lastLeave:{
            type: Date,
            required: false
        }
    },
    earnedLeaves:{
        number:{
            type: Number,
            required: function(){
                if(this.Designation === 'Teaching'){
                    return true;
                }
                return false;
            }
        },
        lastLeave:{
            type: Date,
            required: false
        }
    },
    specialLeaves:{
        number:{
            type: Number,
            required:  function(){
                if(this.Designation === 'Teaching'){
                    return true;
                }
                return false;
            },
        },
        lastLeave:{
            type: Date,
            required: false
        }
    },
    commutedLeaves:{
        number:{
            type: Number,
            required: function(){
                if(this.Designation === 'Non Teaching'){
                    return true;
                }
                return false;
            }
        },
        lastLeave:{
            type: Date,
        }
    },
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;