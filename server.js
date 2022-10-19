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
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//  store for express middleware
const store = new MongoDbStore({
  uri: process.env.MONGODB_URL,
  databaseName: "bill_spliter",
  collection: "sessions",
});
//  session middleware
// app.use(
//   expressSession({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       maxAge: 1000 * 24 * 60 * 60, //24hr in milesecond
//     },
//   })
// );
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
const passportStrategy = require("./pasport.js");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("server session", req.session);
  console.log("server  user", req.user);
  next();
});

//  router
app.use("/auth", authRoute);
app.use("/api", router);

app.use((err, req, res, dome) => {
  if (err) console.log("server.js", err);
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
