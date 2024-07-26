const Employee = require('../models/employeeDB');

const updateEmployee = async (req, res) => {
    if(!req.session.firstName){
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        });
    }
    const firstName = req.session.firstName;
    const {typeOfLeave,startDate,endDate,numberOfDays} = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const month = startDateObj.getMonth();

    try {
        const employee = await Employee.findOne({firstName: firstName});
        if(employee.designation !== "Non IT"){
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
                    }else{
                        employee.casualLeaves.lastLeave = new Date();
                        employee.casualLeaves.number -= numberOfDays;
                        await employee.save();
                    }
                }else{
                    employee.casualLeaves.lastLeave = new Date();
                    employee.casualLeaves.number -= numberOfDays;
                    await employee.save();
                }
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
                    else{
                        employee.earnedLeaves.lastLeave = new Date();
                        employee.earnedLeaves.number -= numberOfDays;
                        await employee.save();
                    }
                }else{
                    employee.earnedLeaves.lastLeave = new Date();
                    employee.earnedLeaves.number -= numberOfDays;
                    await employee.save();
                }
                return res.status(200).send({
                    success: true,
                    message: "Earned leave granted successfully"
                });
            }
            if(typeOfLeave == "special"){
                if(employee.specialLeaves.number == 0){
                    return res.status(400).send({
                        success: false,
                        message: "No committed leaves left"
                    });
                }
                if(employee.specialLeaves.lastLeave != null){
                    if(employee.specialLeaves.lastLeave.getMonth() == month){
                        return res.status(200).send({
                            success: false,
                            message: "Already taken committed leave this month"
                        });
                    }
                    else{
                        employee.specialLeaves.lastLeave = new Date();
                        employee.specialLeaves.number -= numberOfDays;
                        await employee.save();
                    }
                }
                else{
                    employee.specialLeaves.lastLeave = new Date();
                    employee.specialLeaves.number -= numberOfDays;
                    await employee.save();
                }
                return res.status(200).send({
                    success: true,
                    message: "Committed leave updated successfully"
                });
            }
        }else{
            if(typeOfLeave == "commuted"){
                if(employee.commutedLeaves.number == 0){
                    return res.status(400).send({
                        success: false,
                        message: "No commuted leaves left"
                    });
                }
                if(employee.commutedLeaves.lastLeave != null){
                    if(employee.commutedLeaves.lastLeave.getMonth() == month){
                        return res.status(200).send({
                            success: false,
                            message: "Already taken commuted leave this month"
                        });
                    }
                    else{
                        employee.commutedLeaves.lastLeave = new Date();
                        employee.commutedLeaves.number -= numberOfDays;
                        await employee.save();
                    }
                }
                else{
                    employee.commutedLeaves.lastLeave = new Date();
                    employee.commutedLeaves.number -= numberOfDays;
                    await employee.save();
                }
                return res.status(200).send({
                    success: true,
                    message: "Commuted leave updated successfully"
                });
            }
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
