const Employee = require('../models/employeeDB');

const getAllEmployee = async (req, res) => {
    if(!req.session.isLoggedIn){
        if(!req.session.isAdminLoggedIn){
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            });
        }
    }
    try {
        const employees = await Employee.find();
        if (!employees) {
            return res.status(404).send({
                success: false,
                message: "No employees found! Add employees by signing in as admin"
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