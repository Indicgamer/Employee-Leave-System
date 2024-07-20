const express = require("express");
const adminAuthController = require('../controllers/adminAuthController');

const Router = express.Router();

Router.post("/login", adminAuthController);

module.exports = Router;