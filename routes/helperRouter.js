const express = require("express");
const addEmployee = require('../controllers/addEmployeeController');

const Router = express.Router();

Router.post("/addEmployee",addEmployee);

module.exports = Router;