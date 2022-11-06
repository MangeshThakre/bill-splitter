const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNo: { type: Number },
  profilePhoto: { type: String },
  hash: { type: String },
  salt: { type: String },
  source: { type: Array },
  created_at: { type: Date },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
