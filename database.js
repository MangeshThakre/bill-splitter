const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log(`successfuly connected to DB`))
  .catch((error) => console.log(error));

module.exports = mongoose;
