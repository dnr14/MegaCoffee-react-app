const express = require("express");
const jwt = require("../middleware/jwt");
const UsersSchma = require("../models/UsersSchma");
const { makeError, emptyCheck } = require("../utils/error");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");

router.post("/login", async (req, res) => {
  try {
    const { id, pwd } = req.body;
    const user = await UsersSchma.findOne()
      .where("id")
      .equals(id)
      .select("-_id");

    if (!user) {
      throw new Error("없는 아이디 입니다.");
    }
    if (!user.authenticate(pwd)) {
      throw new Error("비밀번호를 확인하세요.");
    }

    const access_token = await jwt.sign(user);
    res.json({
      message: `${user.id}님 반갑습니다.`,
      role: user.role,
      access_token,
    });
  } catch (error) {
    const { message } = error;
    if (message) {
      res.status(400).json({ message });
    } else {
      res.status(400).json({ error });
    }
  }
});

router.post("/find/id", async (req, res) => {
  try {
    const { email, birthDay } = req.body;
    if (emptyCheck(email)) {
      throw makeError("이메일은 필수 입니다.", 400);
    }
    if (emptyCheck(birthDay)) {
      throw makeError("생년월일은 필수 입니다.", 400);
    }

    const user = await UsersSchma.findOne()
      .where("email")
      .equals(email)
      .where("birthDay")
      .equals(birthDay);

    if (user === null) {
      throw makeError("이메일 생년월일이 맞지 않습니다.", 400);
    }

    const { id } = user;
    res.json({ id });
  } catch (error) {
    const { message, status } = error;
    if (status) {
      res.status(400).json({ message });
    } else {
      res.json({ message });
    }
  }
});

router.post("/find/pwd", async (req, res) => {
  try {
    const { id, email, birthDay } = req.body;
    if (emptyCheck(email)) {
      throw makeError("이메일은 필수 입니다.", 400);
    }
    if (emptyCheck(birthDay)) {
      throw makeError("생년월일은 필수 입니다.", 400);
    }
    if (emptyCheck(id)) {
      throw makeError("아이디는 필수 입니다.", 400);
    }

    let user = await UsersSchma.findOne()
      .where("email")
      .equals(email)
      .where("birthDay")
      .equals(birthDay)
      .where("id")
      .equals(id);

    if (user === null) {
      throw makeError("정보가 맞지 않습니다.", 400);
    }

    const randomString = Math.random().toString(36).slice(4);

    user = await UsersSchma.findOneAndUpdate(
      { id },
      {
        $set: {
          pwd: bcrypt.hashSync(randomString),
        },
      },
      { new: true }
    ).select("-_id -__v -birthDay -name -email -nickName");

    res.json(Object.assign(user, { pwd: randomString }));
  } catch (error) {
    const { message, status } = error;
    if (status) {
      res.status(400).json({ message });
    } else {
      res.json({ message });
    }
  }
});

module.exports = router;
