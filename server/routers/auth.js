const express = require("express");
const jwt = require("../middleware/jwt");
const UsersSchma = require("../models/UsersSchma");
const router = express.Router();

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
      access_token,
    });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ message });
  }
});

module.exports = router;
