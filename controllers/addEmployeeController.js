const Employee = require("../models/employeeDB");

const addEmployees = async (req, res) => {
    const { name, designation } = req.body;
    if (designation == "Teaching") {
        console.log("Teaching");
        const casualLeaves = {
            number: 10,
        }
        const earnedLeaves = {
            number: 10,
        }
        const specialLeaves = {
            number: 10,
        }
        try {
            const existingEmployee = await Employee.findOne({ name: name });
            console.log(existingEmployee);
            if (existingEmployee) {
                return res.status(400).send({
                    success: false,
                    message: "Employee already exists"
                });
            }
            const employee = new Employee({
                name,
                designation,
                casualLeaves,
                earnedLeaves,
                specialLeaves
            });
            await employee.save();
            res.status(201).send({
                success: true,
                message: "Employee added successfully"
            });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error while adding employee"
            });
        }
    } else {
        const commutedLeaves = {
            number: 10,
        }
        try {
            const existingEmployee = await Employee.findOne({ name: name });
            if (existingEmployee) {
                return res.status(400).send({
                    success: false,
                    message: "Employee already exists"
                });
            }
            const employee = new Employee({
                name,
                designation,
                commutedLeaves
            });
            await employee.save();
            res.status(201).send({
                success: true,
                message: "Employee added successfully"
            });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error while adding employee"
            });
        }
    }
}

module.exports = addEmployees;
