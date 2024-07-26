const express = require("express");
const updateEmployee = require('../controllers/updateController');
const getEmployee = require('../controllers/getEmployeeController');
const getAllEmployee = require('../controllers/getAllController');
const deleteEmployee = require('../controllers/deleteEmployeeController');

const Router = express.Router();

Router.post('/applyLeave', updateEmployee);
Router.post("/getEmployee", getEmployee);
Router.get("/getAllEmployee",getAllEmployee);
Router.delete("/deleteEmployee",deleteEmployee);

module.exports = Router;

