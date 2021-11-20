const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userNoticeBoard = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    writer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },
    categoryThumbnail: {
      type: String,
      trim: true,
    },
    createAt: {
      type: String,
      required: true,
      trim: true,
    },
    updateAt: {
      type: String,
      default: "",
      trim: true,
    },
    timeStemp: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("userNoticeBoard", userNoticeBoard);
