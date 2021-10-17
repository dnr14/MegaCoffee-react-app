const express = require("express");
const logger = require("./middleware/logger");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;
db();
app.use(logger());
app.use(express.json());
app.use("/api/users", require("./routers/users"));
app.use("*", (_, res) => res.send("404 not found"));

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
