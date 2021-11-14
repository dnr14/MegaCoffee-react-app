const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

const API_KEY = process.env.API_KEY || "";
const BUCKET = process.env.BUCKET || "";

aws.config.update({
  region: "ap-northeast-2",
  credentials: new aws.CognitoIdentityCredentials({ IdentityPoolId: API_KEY }),
});

const s3 = new aws.S3();

const randomFileName = (filePath, file) =>
  `${filePath}/${uuidv4()}.${file.originalname.split(".").pop()}`;

const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 10, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 2, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  // 이미지 확장자 추출
  const fileType = typeArray[1];
  //이미지 확장자 구분 검사
  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    cb(null, true);
  } else {
    cb({ message: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다." }, false);
  }
};

module.exports = {
  s3upload: (formDataName, uploadFilePath) =>
    multer({
      limits,
      fileFilter,
      storage: multerS3({
        s3,
        bucket: BUCKET,
        acl: "public-read",
        key: (_, file, cb) => cb(null, randomFileName(uploadFilePath, file)),
      }),
    }).single(formDataName),
  s3FileDelete: (key) => {
    const params = { Bucket: BUCKET, Key: key };
    s3.deleteObject(params, (err) => {
      if (err) throw err;
    });
  },
};
