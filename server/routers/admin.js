const express = require("express");
const jwt = require("../middleware/jwt");
const UsersSchma = require("../models/UsersSchma");
const { makeError, emptyCheck } = require("../utils/error");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const query = req.query;
    const limit = Number(query.limit ?? 10);

    const totalResults = await UsersSchma.find().count();
    const totalPages = Math.ceil(totalResults / limit);

    let page = Number(query.page ?? 1);

    if (page > totalPages) {
      page = totalPages;
    }

    const skip = Number((page - 1) * limit);

    // number 형태로 안들어가면 몽구스 페이지네이션이 잘안된다.
    const results = await UsersSchma.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip)
      .select("-_id -__v -pwd");

    res.json({
      results,
      page,
      limit,
      totalPages,
      totalResults,
    });
  } catch (error) {
    const { status, message } = error;
    res.json({
      code: status,
      message: message,
    });
  }
});

router.patch("/users", async (req, res) => {
  try {
    const body = req.body;
    const uniq = body.id;
    const state = body.state;
    const role = body.role;

    const updateObj = {};
    if (!uniq) {
      throw makeError("아이디 필수 입니다.", 400);
    }

    if (state || role) {
      // 계정 상태 변경
      if (state) {
        updateObj.state = state;
      }
      // role 상태 변경
      if (role) {
        updateObj.role = role;
      }

      const user = await UsersSchma.findOneAndUpdate(
        { id: uniq },
        {
          $set: updateObj,
        },
        { new: true }
      ).select("-_id -__v -pwd");

      res.json(user);
    } else {
      throw makeError("state,role은 필수 입니다.", 400);
    }
  } catch (error) {
    const { status, message } = error;
    res.json({
      code: status,
      message,
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UsersSchma.findOne()
      .where("id")
      .equals(id)
      .select("-_id -pwd -__v");

    res.json(user);
  } catch (error) {
    const { message, status } = error;
    res.json({
      code: status,
      message,
    });
  }
});

module.exports = router;
