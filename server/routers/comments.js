const express = require("express");
const router = express.Router();
const Comment = require("../models/CommentSchema");
const verify = require("../middleware/jwt").verify;
const { makeError, emptyCheck } = require("../utils/error");

router.get("/", async (req, res) => {
  let page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const noticeBoardId = req.query.noticeBoardId;
  let totalResults;
  let totalPages;
  let skip;
  let results;

  if (noticeBoardId) {
    totalResults = await Comment.find()
      .where("noticeBoardId")
      .equals(noticeBoardId)
      .count();
    totalPages = Math.ceil(totalResults / limit);

    if (page > totalPages) page = totalPages;

    skip = page - 1 > 0 ? (page - 1) * limit : 0;

    results = await Comment.find()
      .where("noticeBoardId")
      .equals(noticeBoardId)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
  } else {
    totalResults = await Comment.find().count();
    totalPages = Math.ceil(totalResults / limit);

    if (page > totalPages) page = totalPages;

    skip = page - 1 > 0 ? (page - 1) * limit : 0;

    results = await Comment.find().sort({ _id: -1 }).limit(limit).skip(skip);
  }
  res.json({ results, page, limit, totalPages, totalResults });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // if (id.length !== 24) throw makeError(400, "잘못된 입력입니다.");
    const comment = await Comment.find().where("noticeBoardId").equals(id);
    res.json(comment);
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({
      code: status,
      message,
    });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const { body, id: noticeBoardId, writer } = req.body;
    if (emptyCheck(noticeBoardId))
      throw makeError("아이디 값은 필수 입니다.", 400);
    if (emptyCheck(body)) throw makeError("내용은 필수 입니다.", 400);

    const prefix = Math.random().toString(36).slice(6);
    const suffix = Math.random().toString(8).slice(6);

    const comment = await new Comment({
      id: prefix + suffix,
      body,
      noticeBoardId,
      writer,
      createAt: new Date().toLocaleString(),
      timeStemp: new Date().getTime(),
    }).save();

    res.json(comment);
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({
      code: status,
      message,
    });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) throw makeError("잘못된 입력입니다.", 400);
    const { userInfo } = req.decoded;
    const comment = await Comment.findById(id);
    if (comment.writer !== userInfo.id)
      throw makeError("게시자가 아닙니다.", 400);
    await Comment.findOneAndDelete().where("_id").equals(id);
    res.status(204).send();
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({
      code: status,
      message,
    });
  }
});

router.patch("/:id", verify, async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (_id.length !== 24) throw makeError(400, "잘못된 입력입니다.");
    const { userInfo } = req.decoded;
    let comment = await Comment.findById(_id);
    if (comment.writer !== userInfo.id)
      throw makeError("게시자가 아닙니다.", 400);

    const date = new Date();
    comment = await Comment.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
          updateAt: date.toLocaleString(),
          updateTimeStemp: date.getTime(),
        },
      },
      { new: true }
    );

    res.status(200).json(comment);
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({
      code: status,
      message,
    });
  }
});

module.exports = router;
