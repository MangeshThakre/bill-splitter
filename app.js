const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const expressSession = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(expressSession);
require("./pasport.js");

// files
const router = require("./router/router.js");
const authRoute = require("./router/auth.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://bill-splitter-fsjs.cyclic.app",
      "http://localhost:3000",
      "http://localhost:8081",
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
      secure: false,
      // httpOnly: true,
      // SameSite: "None",
    },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.use("/auth", authRoute);
  app.use("/api", router);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  // all routers
  app.use("/auth", authRoute);
  app.use("/api", router);
  app.get("/", (req, res) => {
    res.status(200).json({ success: true, data: "bull spliter server" });
  });
}

app.use((err, req, res, dome) => {
  if (err) console.log("server.js", err);
});

//
module.exports = app;
