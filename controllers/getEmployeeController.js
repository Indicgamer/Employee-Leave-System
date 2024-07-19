const Employee = require('../models/employeeDB');

const getEmployee = async (req, res) => {
    const employeeName = req.session.name;
    try {
        const employee = await Employee.findOne({ name: employeeName });
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }
        res.send({
            success: true,
            employee: employee
        });
    } catch (error) {
        console.error("Failed to get employee:", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = getEmployee;