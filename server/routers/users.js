const express = require("express");
const UsersSchma = require("../models/UsersSchma");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id, pwd, birthDay, name, email } = req.body;
    const userId = await UsersSchma.findOne().where("id").equals(id);
    if (userId) {
      throw new Error("이미 존재하는 아아디입니다.");
    } else {
      let user = new UsersSchma({
        id,
        pwd,
        birthDay,
        name,
        email,
      });
      user = await user.save();
      res.json({ message: `${user.id} 회원등록이 되었습니다.` });
    }
  } catch (error) {
    const { message } = error;
    res.status(400).json({ message });
  }
});

module.exports = router;
