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

    //  schema vallidation function for group
    function groupInfo(allMemberArr) {
      return new groupModel({
        creator: req.body.creator,
        groupName: req.body.groupName,
        groupType: req.body.groupType,
        membersArr: allMemberArr,
      });
    }
    //  schema vallidation function for friends
    function freindsinfo(friendsArr) {
      return new firendsModel({
        name,
        email,
        userId,
        friendsArr: friendsArr,
      });
    }

    // handle member with email
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

    //  handle group arr and friendarr
    async function handleGroupAndFriendArr(membersArr) {
      const memberWithEmail = membersArr.filter((e) => e.email);
      const memberWithUserId = await handleMemberWithEmail(memberWithEmail);
      const memberWithoutArr = membersArr
        .filter((e) => !e.email)
        .map((e) => {
          return { name: e.name, email: e.email, userId: uuidv4() };
        });
      const newFriendsArr = [...memberWithUserId, ...memberWithoutArr];
      const newGroupMembersArr = [
        { name, email, userId },
        ...memberWithUserId,
        ...memberWithoutArr,
      ];
      return { newFriendsArr, newGroupMembersArr };
    }

    try {
      // check friends if present or not
      // if not -  add all the group member as a friend
      //           check first if the groupmember has name as wall as email
      //           if yes - check membre has an account in this app
      //                    if yes - add the userid to the group member
      //                    if no - add the uuid to the group member
      //           if no - add the uuid to the group member
      //           store all the member in array []
      // if yes -  check group member present in friend collection or not
      //           if yes - its means perticular members  already have in id, add the id to the perticular member from friends document
      //           if not - check first if the groupmember has name as wall as email
      //           if yes - check membre has an account in this app
      //                    if yes - add the userid to the group member
      //                    if no - add the uuid to the group member
      //           if no - add the uuid to the group member

      const friendsData = await firendsModel.findOne({ userId });
      if (!friendsData) {
        const { newFriendsArr, newGroupMembersArr } =
          await handleGroupAndFriendArr(membersArr);
        // console.log("friendsArr", friendsArr);
        // console.log("groupMembersArr", groupMembersArr);

        const friendResult = await freindsinfo(newFriendsArr).save();
        const groupResult = await groupInfo(newGroupMembersArr).save();

        res
          .status(200)
          .send({ groupResult, friendsArr: friendResult.friendsArr });
      } else {
        const newMemberArr = [];
        let existingMembersArr = [];

        // seperate existing member and newmember
        membersArr.forEach((member) => {
          const friend = friendsData.friendsArr.find(
            (frnd) =>
              member.name.toLowerCase() == frnd.name.toLowerCase() &&
              member.email.toLowerCase() == frnd.email.toLowerCase()
          );
          if (!friend) newMemberArr.push(member);
          else existingMembersArr.push(friend);
        });

        const { newFriendsArr, newGroupMembersArr } =
          await handleGroupAndFriendArr(newMemberArr);

        const groupMembersArr = [...newGroupMembersArr, ...existingMembersArr];

        // console.log("new memver ", newMemberArr);
        // console.log("existion member ", existingMembersArr);
        // console.log("friendsArr", newFriendsArr);
        // console.log("groupMembersArr", groupMe  mbersArr);

        await firendsModel.updateOne(
          { userId },
          { $push: { friendsArr: { $each: newFriendsArr } } },
          { new: true }
        );

        const groupResult = await groupInfo(groupMembersArr).save();
        res.status(200).send({ groupResult, friendsArr: newFriendsArr });
      }
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
