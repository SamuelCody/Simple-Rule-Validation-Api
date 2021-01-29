const express = require("express");
const router = express.Router();

const { getInfo } = require("../handlers/base");
const { validate } = require("../handlers/validate");

router.get("/", getInfo);
router.post("/validate-rule", validate);

module.exports = router;