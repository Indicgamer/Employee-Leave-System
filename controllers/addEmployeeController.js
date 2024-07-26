const Employee = require("../models/employeeDB");

const addEmployees = async (req, res) => {
    const {firstName,lastName,designation,qualification,department,phoneNumber,emailId} = req.body;
    if (designation !== "Non IT") {
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
            const existingEmployee = await Employee.findOne({ firstName: firstName, lastName: lastName });
            console.log(existingEmployee);
            if (existingEmployee) {
                return res.status(400).send({
                    success: false,
                    message: "Employee already exists"
                });
            }
            const employee = new Employee({
                firstName,
                lastName,
                designation,
                qualification,
                department,
                phoneNumber,
                emailId,
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
            console.log(error);
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
            const existingEmployee = await Employee.findOne({firstName: firstName, lastName: lastName});
            if (existingEmployee) {
                return res.status(400).send({
                    success: false,
                    message: "Employee already exists"
                });
            }
            const employee = new Employee({
                firstName,
                lastName,
                designation,
                qualification,
                department,
                phoneNumber,
                emailId,
                commutedLeaves
            });
            await employee.save();
            res.status(201).send({
                success: true,
                message: "Employee added successfully"
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({
                success: false,
                message: "Error while adding employee"
            });
        }
    }
}

module.exports = addEmployees;
