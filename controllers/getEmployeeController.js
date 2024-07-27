const Employee = require('../models/employeeDB');

const getEmployee = async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.redirect("/");
    }
    const {firstName} = req.body;
    try {
        const employee = await Employee.findOne({ firstName: firstName });
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }
        req.session.firstName = firstName;
        const lastLeave = employee.lastLeave();
        if(lastLeave != "No leaves taken yet"){
            lastLeave.date = lastLeave.date.toDateString();
        }
        return res.render("home",{
            employee:employee,
            lastLeave: lastLeave
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