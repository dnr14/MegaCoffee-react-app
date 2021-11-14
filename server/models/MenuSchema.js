const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    id: {
      type: String,
      required: [true],
      trim: true,
      unique: true,
      select: true,
    },
    title: {
      type: String,
      required: [true],
      trim: true,
      select: true,
    },
    body: {
      type: String,
      required: [true],
      trim: true,
      select: true,
    },
    temperature: {
      type: String,
      required: [true],
      trim: true,
      select: true,
    },
    category: {
      type: String,
      required: [true],
      trim: true,
      select: true,
    },
    thumbnail: {
      type: String,
      required: [true],
      trim: true,
      select: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("menu", menuSchema);
