const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    creator: new Schema(
      {
        name: { type: Object, require: true },
        email: { type: String, require: true },
        id: { type: String, require: true },
      },
      { _id: false }
    ),
    groupName: { type: String, require: true },
    groupType: { type: String, required: true },
    membersArr: [
      new Schema(
        {
          name: { type: Object, require: true },
          email: { type: String },
          userId: { type: Object, require: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

const groupModel = mongoose.model("group", groupSchema);
module.exports = groupModel;
