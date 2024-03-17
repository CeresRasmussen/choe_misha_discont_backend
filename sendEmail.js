const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();
const controllerWrapper = require("./helpers/controllerWrapper");

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  console.log(data);
  const email = { ...data, from: META_EMAIL };
  await transport.sendMail(email);
};

const formEmail = async (req, res, next) => {
  const { name, comment } = req.body;

  const textEmail = {
    to: "sobkowowa@gmail.com",
    subject: "Пропозиції з сайту",
    text: `Користувач ${name} залишив наступний коментар "${comment}"`,
  };

  await sendEmail(textEmail);
  res.status(201).json(data);
};

router.post("/", formEmail);

module.exports = {
  formEmail: controllerWrapper(formEmail),
};
