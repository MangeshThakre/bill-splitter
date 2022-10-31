const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

router.post("/create_group", controller.create_group);

router.get("/get_groups", controller.get_groups);

router.get("/get_friends", controller.get_friends);

router.get("/get_group_member_detail", controller.get_group_member_detail);

router.post("/new_expense", controller.new_expense);

router.get("/get_expenceData", controller.get_expenceData);

module.exports = router;
