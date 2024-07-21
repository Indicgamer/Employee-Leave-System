const express = require("express");
const {adminAuthController, adminLogoutController} = require('../controllers/adminAuthController');

const Router = express.Router();

Router.post("/login", adminAuthController);
Router.get("/logout", adminLogoutController);

module.exports = Router;