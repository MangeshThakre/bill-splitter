const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    groupId: { type: String },
    expanseTyp: { type: String },
    expanseDescription: { type: String, required: true },
    paidBy: { type: String, required: true },
    amount: { type: Number, required: true },
    splitWith: [
      new Schema(
        {
          userId: { type: String, required: true },
          amountLeft: { type: String, required: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);
const expenseModel = mongoose.model("expense", expenseSchema);
module.exports = expenseModel;
