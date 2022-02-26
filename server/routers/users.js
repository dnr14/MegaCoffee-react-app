const express = require("express");
const jwt = require("../middleware/jwt");
const UsersSchma = require("../models/UsersSchma");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { makeError } = require("../utils/error");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const { s3upload, s3FileDelete } = require("../middleware/multer");

const STATIC_PATH = "./public/files/profile";

const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 5, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 2, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1]; // 이미지 확장자 추출

  //이미지 확장자 구분 검사
  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    callback(null, true);
  } else {
    return callback(
      { message: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다." },
      false
    );
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  limits,
  fileFilter,
}).single("file");

// 회원가입
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

// 회원 정보 가져오기
router.get("/me", jwt.verify, async (req, res) => {
  try {
    res.json(req.decoded);
  } catch (error) {
    const { message } = error;
    res.json({ message });
  }
});

// 회원 정보 수정
router.patch("/:id", jwt.verify, (req, res) => {
  s3upload("thumbnail", "profileThumbnail")(req, res, async (err) => {
    try {
      if (err) throw err;
      const { id } = req.params;
      const { nickName } = req.body;
      const { pwd } = req.body;

      const { newPwd } = req.body;
      const user = await UsersSchma.findOne().where("id").equals(id);
      const update = {};
      update.thumbnail = user.thumbnail;
      update.key = user.key;
      update.nickName = nickName;

      if (!id || !nickName) {
        throw makeError("잘못된 요청입니다.", 400);
      }
      if (!user) {
        throw makeError("없는 아이디입니다.", 400);
      }
      if (!user.authenticate(pwd)) {
        throw makeError("패스워드가 틀립니다.", 400);
      }

      if (req.file) {
        const { location, key } = req.file;
        // 기존에 썸네일이있는데 새로운 파일이 들어오면 기존에 파일 삭제
        if (user.thumbnail !== "") {
          s3FileDelete(user.key);
        }
        update.thumbnail = location;
        update.key = key;
      }

      if (newPwd) {
        update.pwd = bcrypt.hashSync(newPwd);
      }

      const newUser = await UsersSchma.findOneAndUpdate(
        { id },
        {
          $set: update,
        },
        { new: true }
      );

      res.json({ message: "정보가 수정되었습니다." });
    } catch (error) {
      if (req.file) {
        s3FileDelete(req.file.key);
      }
      const { message, status } = error;
      if (status) {
        res.status(400).json({ message });
      } else {
        res.json({ message });
      }
    }
  });
});

module.exports = router;
