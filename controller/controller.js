const mongoose = require("../database.js");
// model
const userModel = require("../schema/user_schema.js");
const groupModel = require("../schema/groupSchema.js");
const firendsModel = require("../schema/friendsSchema.js");
const expenseModel = require("../schema/expenseSchema.js");

const { v4: uuidv4 } = require("uuid");

class controller {
  //  create group

  static async create_group(req, res) {
    const groupType = req.body.groupType;
    const groupName = req.body.groupName;
    const userId = req.body.creator.id;
    const name = req.body.creator.name;
    const email = req.body.creator.email;
    const membersArr = req.body.membersArr;

    const groupInfo = new groupModel({
      creator: req.body.creator,
      groupName: req.body.groupName,
      groupType: req.body.groupType,
      membersArr: [{ name, email }, ...membersArr],
    });

    try {
      const groupResult = await groupInfo.save();
      res.status(200).json({ groupResult });
    } catch (error) {
      res.json({
        error: true,
        error: error.message,
      });
      console.log(error);
    }
  }

  static async add_friend(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const userId = req.body.userId;
    const firendsArr = [req.body.friend];
    const friendInfo = new firendsModel({
      name,
      email,
      userId,
      friendsArr: friendsArr,
    });

    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // static async create_group(req, res) {
  //   const userId = req.body.creator.id;
  //   const name = req.body.creator.name;
  //   const email = req.body.creator.email;
  //   const membersArr = req.body.membersArr;

  //   //  schema vallidation function for group
  //   function groupInfo(allMemberArr) {
  //     return new groupModel({
  //       creator: req.body.creator,
  //       groupName: req.body.groupName,
  //       groupType: req.body.groupType,
  //       membersArr: allMemberArr,
  //     });
  //   }
  //   //  schema vallidation function for friends
  //   function freindsinfo(friendsArr) {
  //     return new firendsModel({
  //       name,
  //       email,
  //       userId,
  //       friendsArr: friendsArr,
  //     });
  //   }

  //   // handle member with email
  //   async function handleMemberWithEmail(memberWithEmail) {
  //     const membersEmailArr = memberWithEmail.map((e) => e.email);
  //     const userExist = await userModel.find({ email: membersEmailArr });
  //     const memberWithUserId = [];
  //     memberWithEmail.forEach((element) => {
  //       const user = userExist.find((user) => user.email === element.email);
  //       if (user) {
  //         element.userId == user._id;
  //         memberWithUserId.push({
  //           name: element.name,
  //           email: element.email,
  //           userId: user._id.toString(),
  //         });
  //       } else {
  //         memberWithUserId.push({
  //           name: element.name,
  //           email: element.email,
  //           userId: uuidv4(),
  //         });
  //       }
  //     });
  //     return memberWithUserId;
  //   }

  //   //  handle group arr and friendarr
  //   async function handleGroupAndFriendArr(membersArr) {
  //     const memberWithEmail = membersArr.filter((e) => e.email);
  //     const memberWithUserId = await handleMemberWithEmail(memberWithEmail);
  //     const memberWithoutArr = membersArr
  //       .filter((e) => !e.email)
  //       .map((e) => {
  //         return { name: e.name, email: e.email, userId: uuidv4() };
  //       });
  //     const newFriendsArr = [...memberWithUserId, ...memberWithoutArr];
  //     const newGroupMembersArr = [
  //       { name, email, userId },
  //       ...memberWithUserId,
  //       ...memberWithoutArr,
  //     ];
  //     return { newFriendsArr, newGroupMembersArr };
  //   }

  //   try {
  //     // check friends if present or not
  //     // if not -  add all the group member as a friend
  //     //           check first if the groupmember has name as wall as email
  //     //           if yes - check membre has an account in this app
  //     //                    if yes - add the userid to the group member
  //     //                    if no - add the uuid to the group member
  //     //           if no - add the uuid to the group member
  //     //           store all the member in array []
  //     // if yes -  check group member present in friend collection or not
  //     //           if yes - its means perticular members  already have in id, add the id to the perticular member from friends document
  //     //           if not - check first if the groupmember has name as wall as email
  //     //           if yes - check membre has an account in this app
  //     //                    if yes - add the userid to the group member
  //     //                    if no - add the uuid to the group member
  //     //           if no - add the uuid to the group member

  //     const friendsData = await firendsModel.findOne({ userId });
  //     if (!friendsData) {
  //       const { newFriendsArr, newGroupMembersArr } =
  //         await handleGroupAndFriendArr(membersArr);
  //       // console.log("friendsArr", friendsArr);
  //       // console.log("groupMembersArr", groupMembersArr);

  //       const friendResult = await freindsinfo(newFriendsArr).save();
  //       const groupResult = await groupInfo(newGroupMembersArr).save();

  //       res
  //         .status(200)
  //         .send({ groupResult, friendsArr: friendResult.friendsArr });
  //     } else {
  //       const newMemberArr = [];
  //       let existingMembersArr = [];

  //       // seperate existing member and newmember
  //       membersArr.forEach((member) => {
  //         const friend = friendsData.friendsArr.find(
  //           (frnd) =>
  //             member.name.toLowerCase() == frnd.name.toLowerCase() &&
  //             member.email.toLowerCase() == frnd.email.toLowerCase()
  //         );
  //         if (!friend) newMemberArr.push(member);
  //         else existingMembersArr.push(friend);
  //       });

  //       const { newFriendsArr, newGroupMembersArr } =
  //         await handleGroupAndFriendArr(newMemberArr);

  //       const groupMembersArr = [...newGroupMembersArr, ...existingMembersArr];

  //       await firendsModel.updateOne(
  //         { userId },
  //         { $push: { friendsArr: { $each: newFriendsArr } } },
  //         { new: true }
  //       );

  //       const groupResult = await groupInfo(groupMembersArr).save();
  //       res.status(200).send({ groupResult, friendsArr: newFriendsArr });
  //     }
  //   } catch (error) {
  //     res.json({
  //       error: true,
  //       error: error.message,
  //     });
  //     console.log(error);
  //   }
  // }

  // delete group
  static async delete_group(req, res) {
    const groupId = req.query.groupId;
    try {
      const result = await groupModel.findByIdAndDelete(groupId);
      if (result) res.status(200).json({ data: "deleted" });
      else res.status(500).json({ error: "not found" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
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
    const groupId = mongoose.Types.ObjectId(req.query.groupId);
    const userId = mongoose.Types.ObjectId(req.query.userId);
    try {
      const [groupMemberDetail] = await groupModel.aggregate([
        { $match: { _id: groupId } },
        { $addFields: { _idStr: { $toString: "$_id" } } },
        { $addFields: { userIdStr: { $toString: userId } } },
        {
          // join friends collection
          $lookup: {
            from: "friends",
            localField: "userIdStr",
            foreignField: "userId",
            as: "freinds",
          },
        },
        { $unwind: "$freinds" },
        {
          // join friends collection
          $lookup: {
            from: "expenses",
            localField: "_idStr",
            foreignField: "groupId",
            as: "expensesArr",
          },
        },
        {
          $project: {
            _id: 0,
            groupId: "$_id",
            membersArr: "$membersArr",
            friends: "$freinds",
            expensesArr: "$expensesArr",
          },
        },
      ]);

      const friends = groupMemberDetail.friends;
      const expensesArr = groupMemberDetail.expensesArr;
      function handleMember(currentMemberExpenseArr, currentMember) {
        const member = {};
        friends.friendsArr.forEach((friend) => {
          if (currentMember.userId == req.query.userId) {
            member["name"] = friends.name;
            member["id"] = friends.userId;
            member["email"] = friends.email;
            return;
          } else if (
            friend.userId == currentMember.userId &&
            friend.userId != req.query.userId
          ) {
            member["name"] = friend.name;
            member["id"] = friend.userId;
            member["email"] = friend.email;
            return;
          }
        });
        let transection = [];
        currentMemberExpenseArr.forEach((expense) => {
          const obj = {};
          if (expense.paidBy === currentMember.userId) {
            const splitWithMember = expense.splitWith.filter(
              ({ userId }) => currentMember.userId !== userId
            );
            obj["owed"] = [];
            obj["groupId"] = expense.groupId;
            splitWithMember.forEach((e) =>
              obj["owed"].push({
                userId: expense.paidBy,
                amount: e.amountLeft,
              })
            );
          } else {
            const splitWithMember = expense.splitWith.find(
              ({ userId }) => currentMember.userId == userId
            );
            obj["groupId"] = expense.groupId;
            obj["owe"] = {
              userId: expense.paidBy,
              amount: splitWithMember.amountLeft,
            };
          }
          transection.push(obj);
        });
        member["transection"] = transection;
        // console.log(currentMemberExpenseArr);
        return member;
      }

      function handleMembersDetailArr(member) {
        const currentMemberExpenseArr = expensesArr.filter(({ splitWith }) =>
          splitWith.some(({ userId }) => userId === member.userId)
        );
        return handleMember(currentMemberExpenseArr, member);
      }

      const membersDetailArr = [];
      groupMemberDetail.membersArr.forEach((member) => {
        membersDetailArr.push(handleMembersDetailArr(member));
      });

      // console.log(membersDetailArr);

      res.status(200).json(membersDetailArr);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  //  new expance
  static async new_expense(req, res) {
    const groupId = req.body.groupId;
    const expanseType = req.body.expanseType;
    const expanseDescription = req.body.expanseDescription;
    const amount = req.body.amount;
    const paidBy = req.body.paidBy;
    const splitWith = req.body.splitWith;
    const expenseInfo = new expenseModel({
      groupId,
      expanseType,
      expanseDescription,
      amount,
      paidBy,
      splitWith,
    });
    try {
      const expanceResult = await expenseInfo.save();
      res.status(200).json(expanceResult);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  // get group expence data
  static async get_expenceData(req, res) {
    const groupId = mongoose.Types.ObjectId(req.query.groupId);
    try {
      const groupDateil = await groupModel.aggregate([
        { $match: { _id: groupId } },
        { $addFields: { _idStr: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "expenses",
            localField: "_idStr",
            foreignField: "groupId",
            as: "expensesArr",
          },
        },
        { $unwind: "$expensesArr" },
      ]);

      function handleMembers(groupMembers, splitWith) {
        const membersArr = [];
        splitWith.forEach((e, i) => {
          const member = groupMembers.find(
            (member) => member.email === e.email
          );
          membersArr.push({
            id: e.email,
            name: member.name,
            email: member.email,
            amountLeft: e.amountLeft,
            isSettled: e.isSettled,
          });
        });
        return membersArr;
      }
      function handlePaidBy(membersArr, paidBy) {
        return membersArr.find((e) => e.email == paidBy);
      }

      const groupExpenseData = [];
      groupDateil.forEach((group) => {
        const expenceData = {};
        expenceData["memberArr"] = handleMembers(
          group.membersArr,
          group.expensesArr.splitWith
        );
        expenceData["expanseDescription"] =
          group.expensesArr.expanseDescription;
        expenceData["id"] = group.expensesArr._id;
        expenceData["createdAt"] = group.expensesArr.createdAt;
        expenceData["amount"] = group.expensesArr.amount;
        expenceData["paidBy"] = handlePaidBy(
          group.membersArr,
          group.expensesArr.paidBy
        );
        groupExpenseData.push(expenceData);
      });

      // console.log(groupExpenseData);
      res.status(200).json(groupExpenseData);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }

  // settle_expense
  static async settle_expense(req, res) {
    const expenseId = req.query.expenseId;
    const userEmail = req.query.userEmail;
    try {
      const result = await expenseModel.findOneAndUpdate(
        {
          _id: expenseId,
          "splitWith.email": userEmail,
        },
        {
          $set: { "splitWith.$.isSettled": true },
        },
        { returnOriginal: false }
      );
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = controller;
