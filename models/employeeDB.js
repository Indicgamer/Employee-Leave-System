const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true,
    },
    qualification:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    casualLeaves:{
        number:{
            type: Number,
            required: function(){
                if(this.Designation !== 'Non IT'){
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
                if(this.Designation !== 'Non IT'){
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
                if(this.Designation !== 'Non IT'){
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
                if(this.Designation === 'Non IT'){
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