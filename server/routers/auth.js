const express = require("express");
const jwt = require("jsonwebtoken");
const UsersSchma = require("../models/UsersSchma");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

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

    const payload = {
      userInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const tokenOption = {
      expiresIn: "30m", // 10분
      issuer: "localhost",
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, tokenOption);
    res.json({ message: `${user.id}님 반갑습니다.`, access_token });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ message });
  }
});

module.exports = router;
