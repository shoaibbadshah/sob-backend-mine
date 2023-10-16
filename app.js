require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const passport = require("passport");
const app = express();

const allowedOrigins = [
  "https://feat-walletnpackage--cerulean-horse-976152.netlify.app",
  "http://localhost:8081",
]; // Add any other allowed origins as needed

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./middlewares/passport.middleware");

require("./routes/auth")(app);

app.use("/api/payment", require("./routes/payment"));

// const MONGODB_URL = process.env.MONGODB_URL || ;
const MONGODB_URL =
  "mongodb+srv://schoolofBitCoin:schoolofBitCoin@schoolbitcoin.y1n5fcl.mongodb.net/";
db.mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
    debugger;
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.send({ message: "Welcome to application." });
});
app.get("/hello", (req, res) => {
  res.send("Hello, Firebase!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
