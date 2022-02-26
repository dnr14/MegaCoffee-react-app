const express = require("express");
const logger = require("./middleware/logger");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "/public");
const IMG_PATH = `${ROOT}/files/profile/`;

db();
app.use(logger());
app.use(express.json());
app.use(cors());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X_BPI_CONTEXT"
  );
  res.header("Content-Type", "application/json");
  next();
});
app.use("/api/users", require("./routers/users"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/admin", require("./routers/admin"));
app.use("/api/noticeBoard", require("./routers/noticeBoard"));
app.use("/api/comments", require("./routers/comments"));
app.use("/public/files/profile/:imgname", (req, res) => {
  res.set("Cache-Control", "public, max-age=240");
  res.sendFile(`${IMG_PATH}${req.params.imgname}`);
});
app.use("*", (_, res) => res.send("404 not found"));

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
