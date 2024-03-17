const nodemailer = require("nodemailer");
require("dotenv").config();

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

const sendEmail = async (email) => {
  console.log(email);

  await transport.sendMail({ ...email, from: META_EMAIL });
  console.log("Message відіслано");
};

module.exports = sendEmail;
