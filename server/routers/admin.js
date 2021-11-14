const express = require("express");
const jwt = require("../middleware/jwt");
const UsersSchma = require("../models/UsersSchma");
const MenuSchema = require("../models/MenuSchema");
const { makeError } = require("../utils/error");
const { s3upload, s3FileDelete } = require("../middleware/multer");
const router = express.Router();

// 유저 정보 다 가져오기
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

// 특정 유저 정보 가져오기
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

// 유저 정보 수정
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

// 메뉴 등록 api
router.post("/menu", (req, res) => {
  s3upload("image", "menus")(req, res, async (err) => {
    try {
      if (err) throw err;

      if (req.file === undefined) {
        throw makeError("썸네일이 없습니다.", 400);
      }

      if (
        req.body.title === undefined ||
        req.body.body === undefined ||
        req.body.temperature === undefined ||
        req.body.category === undefined
      ) {
        s3FileDelete(req.file.key);
        throw makeError("입력 값이 충족하지 않습니다.", 400);
      }

      const { title, body, temperature, category } = req.body;
      const { location } = req.file;

      const prefix = Math.random().toString(36).slice(6);
      const subfix = Math.random().toString(8).slice(5);

      const menu = await new MenuSchema({
        id: prefix + subfix,
        title,
        body,
        temperature,
        category,
        thumbnail: location,
      }).save();

      res.json(menu);
    } catch (error) {
      const { message, status: code = 504 } = error;
      res.json({
        code,
        message,
      });
    }
  });
});

// 메뉴 가져오기 api
router.get("/menu", async (_, res) => {
  try {
    const limit = 10;
    const menus = await MenuSchema.find().sort({ _id: -1 }).select("-_id");
    const totalResults = await MenuSchema.find().count();
    const totalPages = Math.ceil(totalResults / limit);

    res.json({
      results: menus,
      page: 1,
      limit,
      totalPages,
      totalResults,
    });
  } catch (e) {
    const { message, status = 503 } = e;
    res.json({ code: status, message });
  }
});

module.exports = router;
