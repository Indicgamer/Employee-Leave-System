const Employee = require('../models/employeeDB');

const getEmployee = async (req, res) => {
    if(!req.session.isLoggedIn){
        res.redirect("/");
    }
    const {name} = req.body;
    try {
        const employee = await Employee.findOne({ name: name });
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }
        req.session.name = name;
        res.render("home",{employee:employee});
    } catch (error) {
        console.error("Failed to get employee:", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = getEmployee;