require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./router/router.js");
const authRoute = require("./router/auth.js");
const path = require("path");

const expressSession = require("express-session");
const { route } = require("./router/router.js");
const MongoDbStore = require("connect-mongodb-session")(expressSession);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8081",
      "https://bill-spliter-mern-app.up.railway.app",
    ],
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

//  store for express middleware
const store = new MongoDbStore({
  uri: process.env.MONGODB_URL,
  databaseName: "bill_spliter",
  collection: "sessions",
  expires: 1000 * 24 * 60 * 60, //24hr in milisecond
});

//  session middleware

// 1. Uninitialised = false
// It means that Your session is only Stored into your storage, when any of the Property is modified in req.session
// 2. Uninitialised = true
// It means that Your session will be stored into your storage Everytime for request. It will not depend on the modification of req.session.
// 3. resave = true
// It means when the modification is performed on the session it will re write the req.session.cookie object.
// 4. resave = false
// It will not rewrite the req.session.cookie object. the initial req.session.cookie remains as it is.

app.use(
  expressSession({
    name: "Bill-spliter-session",
    secret: process.env.SECRET,
    store: store,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60, // 24 hours in miliseconnds
    },
  })
);

require("./pasport.js");
app.use(passport.initialize());
app.use(passport.session());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
//   //  router
//   app.use("/auth", authRoute);
//   app.use("/api", router);
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
// else {
app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "bull spliter server" });
});
app.use("/auth", authRoute);
app.use("/api", router);
// }

app.use((err, req, res, dome) => {
  if (err) console.log("server.js", err);
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
