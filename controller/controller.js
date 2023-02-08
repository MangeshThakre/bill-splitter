const mongoose = require("../database.js");
// model
const userModel = require("../schema/user_schema.js");
const groupModel = require("../schema/groupSchema.js");
const firendsModel = require("../schema/friendsSchema.js");
const expenseModel = require("../schema/expenseSchema.js");

class controller {
  // update user name
  static async update_user_name(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userId = req.body.userId;

    try {
      const result = await userModel.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName
        },
        { new: true, select: { hash: 0, salt: 0 } }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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
      membersArr: [{ name, email }, ...membersArr]
    });

    try {
      const groupResult = await groupInfo.save();
      res.status(200).json({ groupResult });
    } catch (error) {
      res.json({
        error: true,
        error: error.message
      });
      console.log(error);
    }
  }

  // update group
  static async update_group(req, res) {
    const groupId = req.body.groupId;
    const membersArr = req.body.membersArr;
    const groupType = req.body.groupType;
    const groupName = req.body.groupName;
    try {
      const result = await groupModel.findOneAndUpdate(
        { _id: groupId },
        {
          $set: {
            membersArr,
            groupType,
            groupName
          }
        },
        { returnOriginal: false }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // remove group member
  static async remove_group_member(req, res) {
    const groupId = req.query.groupId;
    const memberEmail = req.query.memberEmail;
    try {
      const result = await groupModel.findOneAndUpdate(
        { _id: groupId },
        {
          $pull: {
            membersArr: {
              email: memberEmail
            }
          }
        },
        { returnOriginal: false }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // add friend
  static async add_friend(req, res) {
    const user = req.body.user;
    const firendArr = [req.body.friend];

    try {
      const result = await firendsModel.findOneAndUpdate(
        { userId: user.userId },
        { $push: { friendsArr: { $each: firendArr } } },
        { returnOriginal: false }
      );
      res.status(200).json({ friendsArr: result.friendsArr });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // update friend
  static async update_friend(req, res) {
    const friend = req.body.friend;
    const userId = req.body.userId;
    try {
      const result = await firendsModel.findOneAndUpdate(
        { userId, "friendsArr.email": friend.email },
        {
          $set: { "friendsArr.$.name": friend.name }
        },
        { returnOriginal: false }
      );
      res.status(200).json({ friendsArr: result.friendsArr });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // delete friend
  static async delete_friend(req, res) {
    const userId = req.query.userId;
    const friendEmail = req.query.friendEmail;
    try {
      const result = await firendsModel.findOneAndUpdate(
        { userId },
        {
          $pull: {
            friendsArr: {
              email: friendEmail
            }
          }
        },
        { returnOriginal: false }
      );
      res.status(200).json({ friendsArr: result.friendsArr });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

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
      const groups = await groupModel.aggregate([
        {
          $match: {
            membersArr: { $elemMatch: { email: userEmail } }
          }
        },
        { $addFields: { userEmail: userEmail } },
        {
          $lookup: {
            from: "friends",
            localField: "userEmail",
            foreignField: "email",
            as: "friends"
          }
        },
        { $unwind: "$friends" }
      ]);

      const groupDistinctByID = groups.reduce((acc, crr) => {
        const isGroupAlreadyExist = acc.some(
          (group) => group._id.toString() == crr._id.toString()
        );
        if (!isGroupAlreadyExist) acc.push(crr);
        return acc;
      }, []);

      // check the member is friend
      function membersArr(membersArr, friendsArr) {
        const groupMembersArr = [];
        membersArr.forEach((member) => {
          const friend = friendsArr.find((e) => e.email == member.email);
          if (friend) return groupMembersArr.push(friend);
          else return groupMembersArr.push(member);
        });
        return groupMembersArr;
      }

      const groupArr = [];
      groupDistinctByID.forEach((group) => {
        const groupObj = {};
        (groupObj["_id"] = group._id),
          (groupObj["creator"] = group.creator),
          (groupObj["groupName"] = group.groupName),
          (groupObj["groupType"] = group.groupType),
          (groupObj["membersArr"] = membersArr(
            group.membersArr,
            group.friends.friendsArr
          )),
          (groupObj["createdAt"] = group.createdAt),
          (groupObj["updatedAt"] = group.updatedAt),
          groupArr.push(groupObj);
      });
      res.json({ error: false, data: groupArr });
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
            as: "freinds"
          }
        },
        { $unwind: "$freinds" },
        {
          // join friends collection
          $lookup: {
            from: "expenses",
            localField: "_idStr",
            foreignField: "groupId",
            as: "expensesArr"
          }
        },
        {
          $project: {
            _id: 0,
            groupId: "$_id",
            membersArr: "$membersArr",
            friends: "$freinds",
            expensesArr: "$expensesArr"
          }
        }
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
                amount: e.amountLeft
              })
            );
          } else {
            const splitWithMember = expense.splitWith.find(
              ({ userId }) => currentMember.userId == userId
            );
            obj["groupId"] = expense.groupId;
            obj["owe"] = {
              userId: expense.paidBy,
              amount: splitWithMember.amountLeft
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
    const expenseType = req.body.expenseType;
    const expanseDescription = req.body.expanseDescription;
    const amount = req.body.amount;
    const paidBy = req.body.paidBy;
    const splitWith = req.body.splitWith;
    // console.log(paidBy);
    const expenseInfo = new expenseModel({
      groupId,
      expenseType,
      expanseDescription,
      amount,
      paidBy,
      splitWith
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
    const userId = req.query.userId;
    try {
      const groupDateil = await groupModel.aggregate([
        { $match: { _id: groupId } },
        { $addFields: { _idStr: { $toString: "$_id" }, userId: userId } },

        {
          $lookup: {
            from: "expenses",
            localField: "_idStr",
            foreignField: "groupId",
            as: "expensesArr"
          }
        },
        {
          $lookup: {
            from: "friends",
            localField: "userId",
            foreignField: "userId",
            as: "friends"
          }
        },
        { $unwind: "$expensesArr" },
        { $unwind: "$friends" }
      ]);

      function handleMembers(groupMembers, friends, splitWith) {
        const membersArr = [];
        splitWith.forEach((e, i) => {
          const memberFromFriends = friends.find(
            (member) => member.email == e.email
          );
          const member = groupMembers.find(
            (member) => member.email === e.email
          );
          membersArr.push({
            id: e.email,
            name: memberFromFriends ? memberFromFriends.name : member.name,
            email: memberFromFriends ? memberFromFriends.email : member.email,
            amountLeft: e.amountLeft,
            isSettled: e.isSettled
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
          group.friends.friendsArr,
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
      console.log(error);
    }
  }

  static async get_private_expenseData(req, res) {
    const userEmail = req.query.user;
    const friendEmail = req.query.friend;
    const userId = req.query.userId;
    try {
      const friendDetail = await expenseModel.aggregate([
        { $match: { expenseType: "PRIVATE" } },
        { $match: { "splitWith.email": friendEmail } },
        { $match: { "splitWith.email": userEmail } },

        { $addFields: { userId: userId } },
        {
          $lookup: {
            from: "friends",
            localField: "userId",
            foreignField: "userId",
            as: "friends"
          }
        },
        { $unwind: "$friends" }
        // { $unwind: "$friends.friendsArr" },
      ]);
      function handleMembers(groupMembers, splitWith) {
        const membersArr = [];
        splitWith.forEach((e, i) => {
          const member = groupMembers.find((member) => member.email == e.email);
          membersArr.push({
            id: e.email,
            name: member ? member.name : e.name,
            email: member ? member.email : e.email,
            amountLeft: e.amountLeft,
            isSettled: e.isSettled
          });
        });
        return membersArr;
      }
      function handlePaidBy(membersArr, splitWith, paidBy) {
        const member = membersArr.find((e) => e.email == paidBy);
        if (member) return member;
        else {
          const paidmember = splitWith.find((e) => e.email == paidBy);
          return { name: paidmember.name, email: paidmember.email };
        }
      }

      const friendExpenseData = [];
      friendDetail.forEach((group) => {
        const expenceData = {};
        expenceData["memberArr"] = handleMembers(
          group.friends.friendsArr,
          group.splitWith
        );
        expenceData["expanseDescription"] = group.expanseDescription;
        expenceData["createdAt"] = group.createdAt;
        expenceData["amount"] = group.amount;
        expenceData["id"] = group._id;
        expenceData["paidBy"] = handlePaidBy(
          group.friends.friendsArr,
          group.splitWith,
          group.paidBy
        );
        friendExpenseData.push(expenceData);
      });

      res.status(200).json(friendExpenseData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
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
          "splitWith.email": userEmail
        },
        {
          $set: { "splitWith.$.isSettled": true }
        },
        { returnOriginal: false }
      );
      res.status(200).json(result);
      // console.log(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  //get_all_expenses
  static async get_all_expenses(req, res) {
    const { userEmail, userId } = req.query;
    try {
      // group expenses
      const groupExpeses = await groupModel.aggregate([
        {
          $match: {
            membersArr: { $elemMatch: { email: userEmail } }
          }
        },
        { $addFields: { _idStr: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "expenses",
            localField: "_idStr",
            foreignField: "groupId",
            as: "expenses"
          }
        },
        {
          $project: {
            _id: 0,
            groupId: "$_id",
            groupType: "$groupType",
            expenseType: "GROUP",
            groupName: "$groupName",
            expenses: "$expenses.expanseDescription",
            amount: "$expenses.amount"
          }
        }
      ]);

      const friends = await firendsModel.findOne({ userId });
      const friendsArr = friends ? friends.friendsArr : [];

      const personalExpenses = await expenseModel.aggregate([
        { $match: { expenseType: "PRIVATE" } },
        { $match: { "splitWith.email": userEmail } }
      ]);

      // pprivete expense
      const friendExpenseArr = [];
      friendsArr.forEach((friend) => {
        const obj = {};
        const friendExpense = personalExpenses.filter((e) =>
          e.splitWith.some((member) => member.email == friend.email)
        );
        if (friendExpense.length < 1) return;
        obj["groupId"] = "";
        obj["groupType"] = "";
        obj["expenseType"] = "PRIVATE";
        obj["friendName"] = friend.name;
        obj["friendEmail"] = friend.email;
        obj["expenses"] = friendExpense.map((ex) => ex.expanseDescription);
        obj["amount"] = friendExpense.map((ex) => ex.amount);
        friendExpenseArr.push(obj);
      });

      // all expenses arr
      const allExpenses = [...groupExpeses, ...friendExpenseArr];
      res.status(200).json(allExpenses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async remove_expense(req, res) {
    const expenseId = req.query.expenseId;
    try {
      const result = await expenseModel.findOneAndRemove({ _id: expenseId });
      console.log(result);
      if (result) return res.status(200).json("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = controller;
