const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passwordListRouter = require("./routes/passwordListRouter");
const authRouter = require("./routes/authRouter");
const cors = require("cors");

const app = express();

// 1. CRITICAL FOR RENDER DEPLOYMENT
// Tells Express to trust the proxy (Render) so cookies work securely
app.set("trust proxy", 1); 

const DB_PATH = process.env.DB_PATH;

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));

// 2. DYNAMIC CORS ORIGIN
// Allows both localhost (for testing) and your Vercel app
const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL // We will set this var in Render
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "My-secret-key", // Read from env
    resave: false,
    saveUninitialized: false,
    store: store,
    // 3. SECURE COOKIE SETTINGS FOR CROSS-DOMAIN (Vercel <-> Render)
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true on Render
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' on Render
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use("/api/passwordList", passwordListRouter);
app.use("/api/auth", authRouter);

// 4. USE PROCESS.ENV.PORT
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });