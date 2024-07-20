const Employee = require('../models/employeeDB');

const getAllEmployee = async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const employees = await Employee.find();
        if (!employees) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }
        res.status(200).send({
            success: true,
            employees: employees
        });
    } catch (error) {
        console.error("Failed to get employee:", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = getAllEmployee;