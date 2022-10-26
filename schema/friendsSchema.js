const mongoose = require("mongoose");
const { Schema } = mongoose;

const friendsSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  userId: { type: String, require: true },
  friendsArr: [
    new Schema(
      {
        name: { type: String, require: true },
        email: { type: String },
      },
      { _id: false }
    ),
  ],
});

const firendsModel = mongoose.model("friends", friendsSchema);
module.exports = firendsModel;
