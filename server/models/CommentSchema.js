const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    noticeBoardId: {
      type: String,
      required: true,
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
    updateTimeStemp: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("comment", comment);
