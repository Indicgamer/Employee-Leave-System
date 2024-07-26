const Employee = require('../models/employeeDB');

const deleteEmployee = async (req, res) => {
    if (!req.session.isAdminLoggedIn) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const employee = await Employee.findOneAndDelete({firstName: req.body.firstName});
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete employee:", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
}
module.exports = deleteEmployee;