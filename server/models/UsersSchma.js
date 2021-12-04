const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const usersSchma = new Schema(
  {
    id: {
      type: String,
      required: [true, "id is required"],
      trim: true,
      unique: true,
      select: true,
    },
    pwd: {
      type: String,
      required: [true, "pwd is required"],
      trim: true,
      select: true,
    },
    birthDay: {
      type: Number,
      required: [true, "birthDay is required"],
      trim: true,
      select: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      select: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      select: true,
    },
    nickName: {
      type: String,
      default: "",
      trim: true,
      select: true,
    },
    img: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      default: "user",
    },
    createAt: {
      type: Number,
      default: new Date().getTime(),
    },
    state: {
      type: String,
      default: "normal",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    key: {
      type: String,
      default: "",
    },
  },
  { toObject: { virtuals: true }, versionKey: false }
);

usersSchma.pre("save", function (next) {
  const user = this;
  if (!user.isModified("pwd")) {
    return next();
  } else {
    user.pwd = bcrypt.hashSync(user.pwd);
    return next();
  }
});

usersSchma.methods.authenticate = function (password) {
  const user = this;
  console.log(String(password), user.pwd);
  return bcrypt.compareSync(String(password), user.pwd);
};

module.exports = mongoose.model("users", usersSchma);
