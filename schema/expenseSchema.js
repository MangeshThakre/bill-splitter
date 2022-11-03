const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    groupId: { type: String },
    expenseType: { type: String, required: true },
    expanseDescription: { type: String, required: true },
    paidBy: { type: String, required: true },
    amount: { type: Number, required: true },
    splitWith: [
      new Schema(
        {
          email: { type: String, required: true },
          amountLeft: { type: Number, required: true },
          isSettled: { type: Boolean, required: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);
const expenseModel = mongoose.model("expense", expenseSchema);
module.exports = expenseModel;
