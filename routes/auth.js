const AuthController = require("../controllers/AuthController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

module.exports = router;
