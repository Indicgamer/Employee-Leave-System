const express = require("express");
const {loginEmployee, signupEmployee} = require('../controllers/authController');


const Router = express.Router();



Router.post('/login', loginEmployee);
Router.post('/signup', signupEmployee);

module.exports = Router;