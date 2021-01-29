require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes");

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//all routes will be here
app.use(routes);

app.use(function (req, res, next) {
    return res.status(400).json({
        message: "Not found",
        status: "error",
        data: null
      });
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
