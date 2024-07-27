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
    },
},{
    methods:{
        lastLeave(){
            if(this.Designation === 'Non IT'){
                return this.commutedLeaves.lastLeave;
            }
            leaves = [];
            if(this.casualLeaves.lastLeave !== undefined){
                leaves.push({
                    typeofLeave: "Casual Leave",
                    date: this.casualLeaves.lastLeave
                });
            }
            if(this.earnedLeaves.lastLeave !== undefined){
                leaves.push({
                    typeofLeave: "Earned Leave",
                    date: this.earnedLeaves.lastLeave
                });
            }
            if(this.specialLeaves.lastLeave !== undefined){
                leaves.push({
                    typeofLeave: "Special Leave",
                    date: this.specialLeaves.lastLeave
                });
            }
            if(leaves.length === 0){
                return "No leaves taken yet";
            }
            return leaves.sort((a,b) => b.date - a.date)[0];
            
        },
    }
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;