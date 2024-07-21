const express = require("express");
const adminAuthController = require('../controllers/authController');
const logoutController = require("../controllers/logoutController");

const Router = express.Router();

Router.post("/login", adminAuthController);
Router.get("/logout", logoutController);

module.exports = Router;