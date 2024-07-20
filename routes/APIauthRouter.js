const express = require("express");
const {loginEmployee} = require('../controllers/authController');


const Router = express.Router();



Router.post('/login', loginEmployee);

module.exports = Router;