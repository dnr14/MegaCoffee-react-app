const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_PATH = process.env.DB;
const db = () => {
  const connect = () => {
    mongoose.connect(DB_PATH, (err) => {
      if (err) {
        console.error("mongo db connect error", err);
      }
      console.log("mongo db connected");
    });
  };

  connect();
  mongoose.connection.on("disconnected", connect);
};
module.exports = db;
