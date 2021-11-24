const express = require("express");
const { makeError, emptyCheck } = require("../utils/error");
const verify = require("../middleware/jwt").verify;
const UserNoticeBoard = require("../models/UserNoticeBoardSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  let page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const totalResults = await UserNoticeBoard.find().count();
  const totalPages = Math.ceil(totalResults / limit);

  if (page > totalPages) page = totalPages;

  const skip = page - 1 > 0 ? (page - 1) * limit : 0;

  const results = await UserNoticeBoard.find()
    .sort({ _id: -1 })
    .limit(limit)
    .skip(skip)
    .select("-_id");

  res.json({ results, page, limit, totalPages, totalResults });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const notice = await UserNoticeBoard.findOne()
    .where("id")
    .equals(id)
    .select("-_id");

  res.json(notice);
});

router.post("/", verify, async (req, res) => {
  try {
    const {
      title,
      body,
      writer,
      category,
      thumbnail = "",
      categoryThumbnail,
    } = req.body;
    if (emptyCheck(title)) throw makeError("제목은 필수입니다.", 400);
    if (emptyCheck(body)) throw makeError("내용은 필수입니다.", 400);
    if (emptyCheck(writer)) throw makeError("작성자는 필수입니다.", 400);
    if (emptyCheck(category)) throw makeError("카테고리는 필수입니다.", 400);
    if (emptyCheck(categoryThumbnail))
      throw makeError("카테고리 사진은 필수입니다.", 400);

    const prefix = Math.random().toString(36).slice(6);
    const suffix = Math.random().toString(8).slice(5);

    const userNoticeBoard = await new UserNoticeBoard({
      id: prefix + suffix,
      title,
      body,
      writer,
      thumbnail,
      category,
      categoryThumbnail,
      createAt: new Date().toLocaleString(),
      timeStemp: new Date().getTime(),
    }).save();

    res.status(201).json({ userNoticeBoard });
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({ code: status, message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    // 업로드되어있는 사진 지우기 개발
    await UserNoticeBoard.findOneAndDelete().where("id").equals(id);
    res.status(204).send();
  } catch (error) {
    const { message, status = 504 } = error;
    res.json({ code: status, message });
  }
});

router.patch("/:id", verify, async (req, res) => {
  const { id } = req.params;
  // 불량 값이 들어오면 정규식으로 거르자
  const { title, body, writer, category, categoryThumbnail } = req.body;

  await UserNoticeBoard.findOneAndUpdate(
    { id },
    {
      $set: {
        ...req.body,
        updateAt: new Date().toLocaleString(),
      },
    },
    { new: true }
  ).select("-_id");
  res.status(204).send("");
});

module.exports = router;
