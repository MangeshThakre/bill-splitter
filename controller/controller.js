const mongoose = require("../database.js");
// model
const userModel = require("../schema/user_schema.js");
const groupModel = require("../schema/groupSchema.js");
const firendsModel = require("../schema/friendsSchema.js");
const { v4: uuidv4 } = require("uuid");
class controller {
  //  create group
  static async create_group(req, res) {
    const userId = req.body.creator.id;
    const name = req.body.creator.name;
    const email = req.body.creator.email;
    const membersArr = req.body.membersArr;

    // const allMemberArr = [{ name, email, userId }, ...req.body.membersArr];

    // const groupInfo = new groupModel({
    //   creator: req.body.creator,
    //   groupName: req.body.groupName,
    //   groupType: req.body.groupType,
    //   membersArr: allMemberArr,
    // });

    function freindsinfo(friendsArr) {
      return new firendsModel({
        name,
        email,
        userId,
        friendsArr: friendsArr,
      });
    }

    async function handleMemberWithEmail(memberWithEmail) {
      const membersEmailArr = memberWithEmail.map((e) => e.email);
      const userExist = await userModel.find({ email: membersEmailArr });
      const memberWithUserId = [];
      memberWithEmail.forEach((element) => {
        const user = userExist.find((user) => user.email === element.email);
        if (user) {
          element.userId == user._id;
          memberWithUserId.push({
            name: element.name,
            email: element.email,
            userId: user._id.toString(),
          });
        } else {
          memberWithUserId.push({
            name: element.name,
            email: element.email,
            userId: uuidv4(),
          });
        }
      });
      return memberWithUserId;
    }

    try {
      const friendsData = await firendsModel.findOne({ userId });
      // check friend if present is present

      if (friendsData) {
        const memberWithEmail = membersArr.filter((e) => e.email);
        const memberWithUserId = await handleMemberWithEmail(memberWithEmail);
        const memberWithoutArr = membersArr
          .filter((e) => !e.email)
          .map((e) => {
            return { name: e.name, email: e.email, userId: uuidv4() };
          });

        console.log(freindsinfo([...memberWithUserId, ...memberWithoutArr]));
      }

      // const friendsData = await firendsModel.findOne({ userId });
      // if (!friendsData) {
      //   await freindsinfo.save();
      // } else {
      //   const newFreinds = [];
      //   req.body.membersArr.forEach((member) => {
      //     const isPresent = friendsData.friendsArr.some(
      //       (friend) =>
      //         member.name == friend.name && member.email == friend.email
      //     );
      //     if (!isPresent) newFreinds.push(member);
      //   });
      //   await firendsModel.updateOne(
      //     { userId },
      //     { $push: { friendsArr: { $each: newFreinds } } }
      //   );
      // }
      // // console.log(groupInfo.membersArr);
      // const groupResult = await groupInfo.save();
      // // console.log(friendResult);
      // res.json({ error: false, data: groupResult });
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
