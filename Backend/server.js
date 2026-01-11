const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passwordListRouter = require("./routes/passwordListRouter");
const authRouter = require("./routes/authRouter");
const DB_PATH = process.env.DB_PATH;
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "My-secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/api/passwordList", passwordListRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Server is running on port https://localhost:3000`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
