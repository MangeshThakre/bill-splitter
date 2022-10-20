require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./router/router.js");
const authRoute = require("./router/auth.js");

const expressSession = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(expressSession);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
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
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60, // 24 hours in miliseconnds
    },
  })
);
require("./pasport.js");
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log("server session", req.session);
//   console.log("server  user", req.user);
//   next();
// });

//  router
app.use("/auth", authRoute);

app.use((err, req, res, dome) => {
  if (err) console.log("server.js", err);
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
