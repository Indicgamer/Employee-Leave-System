const Employee = require('../models/employeeDB');
const bcrypt = require("bcrypt");
const salt = 10;

const loginEmployee = async (req, res) => {
    if(req.session.name){
        return res.status(400).send({
            success: false,
            message: "Already logged in"
        });
    }

    const {name, password} = req.body;
    try {
        const employee = await Employee.findOne({name: name});
        if(!employee){
            return res.status(400).send({
                success: false,
                message: "User does not exist"
            });
        }
        const validPassword = await bcrypt.compare(password, employee.password);
        if(!validPassword){
            return res.status(400).send({
                success: false,
                message: "Invalid Password"
            });
        }
        req.session.name = name;
        res.status(200).send({
            success: true,
            message: "Logged in"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error"
        });
    }
}

const signupEmployee = async (req, res) => {
    if(req.session.name){
        return res.status(400).send({
            success: false,
            message: "Already logged in"
        });
    }


    const {name, type,password} = req.body;
    const casualLeaves = {
        number: 10,
    };
    const earnedLeaves = {
        number: 10,
    };
    const committedLeaves = {
        number: 10,
    };

    const employeeExists = await Employee.findOne({name: name});
    if(employeeExists){
        return res.status(400).send({
            success: false,
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(String(password), salt);
    const employee = new Employee({
        name: name,
        password: hashedPassword,
        type: type,
        casualLeaves: casualLeaves,
        earnedLeaves: earnedLeaves,
        committedLeaves: committedLeaves
    });
    try {
        await employee.save();
        req.session.name = name;
        res.status(200).send({
            success: true,
            message: "User created"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = {loginEmployee, signupEmployee};

    