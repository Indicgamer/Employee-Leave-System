const express = require("express");
const updateEmployee = require('../controllers/updateController');
const getEmployee = require('../controllers/getEmployeeController');

const Router = express.Router();

Router.post('/applyLeave', updateEmployee);
Router.get("/getEmployee", getEmployee);

module.exports = Router;

