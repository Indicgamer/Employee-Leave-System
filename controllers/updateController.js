const Employee = require('../models/employeeDB');

const updateEmployee = async (req, res) => {
    const name = req.session.name;
    const {typeOfLeave,startDate,endDate,numberOfDays} = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const month = startDateObj.getMonth();

    try {
        const employee = await Employee.findOne({name: name});
        if(typeOfLeave == "casual"){
            if(employee.casualLeaves.number == 0){
                return res.status(400).send({
                    success: false,
                    message: "No casual leaves left"
                });
            }
            if(employee.casualLeaves.lastLeave != null){
                if(employee.casualLeaves.lastLeave.getMonth() == month){
                    return res.status(400).send({
                        success: false,
                        message: "Casual leave already taken this month"
                    });
                }
            }else{
                employee.casualLeaves.lastLeave = new Date();
            }
            
            employee.casualLeaves.number -= numberOfDays;
            employee.casualLeaves.lastLeave = endDateObj;
            await employee.save();
            return res.status(200).send({
                success: true,
                message: "Casual leave granted successfully"
            });
        }
        if(typeOfLeave == "earned"){
            if(employee.earnedLeaves.number == 0){
                return res.status(400).send({
                    success: false,
                    message: "No earned leaves left"
                });
            }
            if(employee.earnedLeaves.lastLeave != null){
                if(employee.earnedLeaves.lastLeave.getMonth() == month){
                    return res.status(400).send({
                        success: false,
                        message: "Earned leave already taken this month"
                    });
                }
            }else{
                employee.earnedLeaves.lastLeave = new Date();
            }
            
            employee.earnedLeaves.number -= numberOfDays;
            employee.earnedLeaves.lastLeave = endDateObj;
            await employee.save();
            return res.status(200).send({
                success: true,
                message: "Earned leave granted successfully"
            });
        }
        if(typeOfLeave == "committed"){
            if(employee.committedLeaves.number == 0){
                return res.status(400).send({
                    success: false,
                    message: "No committed leaves left"
                });
            }
            if(employee.committedLeaves.lastLeave != null){
                if(employee.committedLeaves.lastLeave.getMonth() == month){
                    return res.status(200).send({
                        success: false,
                        message: "Already taken committed leave this month"
                    });
                }
            }
            else{
                employee.committedLeaves.lastLeave = new Date();
            }
            
            employee.committedLeaves.number -= numberOfDays;
            employee.committedLeaves.lastLeave = endDateObj;
            await employee.save();
            return res.status(200).send({
                success: true,
                message: "Committed leave updated successfully"
            });
        }
    
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = updateEmployee;
