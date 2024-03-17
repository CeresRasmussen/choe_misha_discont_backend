const express = require("express");
const router = express.Router();

const { sendingEmail } = require("../controlers/sendingEmail");

router.post("/", sendingEmail);

module.exports = router;
