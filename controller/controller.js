const mongoose = require("../database.js");
// model
const userModel = require("../schema/user_schema.js");
const groupModel = require("../schema/groupSchema.js");
const firendsModel = require("../schema/friendsSchema.js");

class controller {
  static async create_group(req, res) {
    const userId = req.body.creator.id;
    const name = req.body.creator.name;
    const email = req.body.creator.email;

    const memberArr = [
      {
        name: req.body.creator.name,
        email: req.body.creator.email,
      },
      ...req.body.membersArr,
    ];

    const groupInfo = new groupModel({
      creator: req.body.creator,
      groupName: req.body.groupName,
      groupType: req.body.groupType,
      membersArr: memberArr,
    });

    try {
      const groupResult = await groupInfo.save();
      const freindsinfo = new firendsModel({
        name,
        email,
        userId,
        friendsArr: req.body.membersArr,
      });
      // const friendResult = await freindsinfo.save();
      // console.log(friendResult);
      res.json({ error: false, data: groupResult });
    } catch (error) {
      res.json({
        error: true,
        error: error,
      });
      console.log(error);
    }
  }

  // get group list
  static async get_groups(req, res) {
    const userEmail = req.body.userEmail;
    try {
      const groups = await groupModel.find({
        membersArr: { $elemMatch: { email: userEmail } },
      });
      res.json({ error: false, data: groups });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  }

  // get friends
  static async get_friends(req, res) {
    const userId = req.body.userId;
    try {
      const { friendsArr } = await firendsModel.findOne({ userId });
      res.json({ error: false, data: friendsArr });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  }
}

module.exports = controller;
