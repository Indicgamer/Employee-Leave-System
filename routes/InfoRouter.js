const express = require("express");
const updateEmployee = require('../controllers/updateController');
const getEmployee = require('../controllers/getEmployeeController');
const getAllEmployee = require('../controllers/getAllController');

const Router = express.Router();

Router.post('/applyLeave', updateEmployee);
Router.post("/getEmployee", getEmployee);
Router.get("/getAllEmployee",getAllEmployee);

module.exports = Router;

