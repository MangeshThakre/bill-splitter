const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

// GET

router.get("/get_groups", controller.get_groups);

router.get("/get_friends", controller.get_friends);

router.get("/get_group_member_detail", controller.get_group_member_detail);

router.get("/get_expenceData", controller.get_expenceData);

router.get("/get_private_expenseData", controller.get_private_expenseData);

router.get("/get_all_expenses", controller.get_all_expenses);

// POST

router.post("/new_expense", controller.new_expense);

router.post("/create_group", controller.create_group);

router.post("/add_friend", controller.add_friend);

// UPDATE

router.put("/update_user_name", controller.update_user_name);

router.put("/update_group", controller.update_group);

router.put("/settle_expense", controller.settle_expense);

router.put("/update_friend", controller.update_friend);

// DELETE

router.delete("/remove_group_member", controller.remove_group_member);

router.delete("/delete_friend", controller.delete_friend);

router.delete("/delete_group", controller.delete_group);

router.delete("/remove_expense", controller.remove_expense);

module.exports = router;
