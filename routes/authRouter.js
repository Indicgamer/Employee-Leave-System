const express = require("express");
const AuthController = require('../controllers/authController');
const logoutController = require("../controllers/logoutController");

const Router = express.Router();

Router.post("/login", AuthController);
Router.get("/logout", logoutController);

module.exports = Router;