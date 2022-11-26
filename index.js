require("dotenv").config();
const app = require("./app.js");

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
