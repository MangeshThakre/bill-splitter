const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

router.post("/sign_up", controller.signup);
module.exports = router;
