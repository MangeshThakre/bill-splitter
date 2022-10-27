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

    const freindsinfo = new firendsModel({
      name,
      email,
      userId,
      friendsArr: req.body.membersArr,
    });

    try {
      const friendsData = await firendsModel.findOne({ userId });
      if (!friendsData) {
        await freindsinfo.save();
      } else {
        const newFreinds = [];
        req.body.membersArr.forEach((member) => {
          const isPresent = friendsData.friendsArr.some(
            (friend) => member.name == friend.name
          );
          if (!isPresent) newFreinds.push(member);
        });
        await firendsModel.updateOne(
          { userId },
          { $push: { friendsArr: { $each: newFreinds } } }
        );
      }
      // console.log(groupInfo.membersArr);
      const groupResult = await groupInfo.save();
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
    const userEmail = req.query.userEmail;
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
    const userId = req.query.userId;
    try {
      const { friendsArr } = await firendsModel.findOne({ userId });
      res.json({ error: false, data: friendsArr });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  }

  // groupMemberDetail
  static async get_group_member_detail(req, res) {
    const groupId = req.query.groupId;
    // console.log()
    try {
      const groupDateil = await groupModel.findById(groupId);
      res.json({ error: false, data: groupDateil });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  }
}

module.exports = controller;
