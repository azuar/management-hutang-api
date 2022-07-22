const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bodyParser = require("body-parser");
const usersController = require("./controller/users");
const hutangController = require("./controller/hutang");
const preOrderController = require("./controller/pre-orders");
const app = express();
const port = process.env.PORT || 9700;

app
  .use(cors())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api", usersController, hutangController, preOrderController)
  .listen(port, () => {
    console.log(`Listen to http://localhost:${port}`);
  });

app.get("/", (req, res) => {
  res.json("Active");
});
