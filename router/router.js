const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

// GET

router.get("/get_groups", controller.get_groups);

router.get("/get_friends", controller.get_friends);

router.get("/get_group_member_detail", controller.get_group_member_detail);

router.get("/get_expenceData", controller.get_expenceData);

// POST

router.post("/new_expense", controller.new_expense);

router.post("/create_group", controller.create_group);

// UPDATE

router.put("/settle_expense", controller.settle_expense);

// DELETE

router.delete("/delete_group", controller.delete_group);

module.exports = router;
