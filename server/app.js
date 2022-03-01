const express = require("express");
const logger = require("./middleware/logger");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "/public");
const IMG_PATH = `${ROOT}/files/profile/`;

const options = {
  origin: "http://megacoffee-project.s3-website.ap-northeast-2.amazonaws.com", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  maxAge: 1728000,
};
app.use(cors(options));
db();
// app.use((_, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "http://megacoffee-project.s3-website.ap-northeast-2.amazonaws.com");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, X_BPI_CONTEXT"
//   );
//   res.header("Content-Type", "application/json");
//   next();
// });
app.use(logger());
app.use(express.json());
app.use("/api/users", require("./routers/users"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/admin", require("./routers/admin"));
app.use("/api/noticeBoard", require("./routers/noticeBoard"));
app.use("/api/comments", require("./routers/comments"));
app.use("/public/files/profile/:imgname", (req, res) => {
  res.set("Cache-Control", "public, max-age=240");
  res.sendFile(`${IMG_PATH}${req.params.imgname}`);
});
app.use("*", (_, res) => {
  res.send("404 not found");
});

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
