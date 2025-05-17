const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const { META_EMAIL, META_PASSWORD } = process.env;

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
  try {
    console.log("Надсилаємо лист:", email);

    const message = {
      ...email,
      from: `"АТ «Чернівціобленерго»" <${META_EMAIL}>`,
      attachments: email.attachments || [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../public/logo.png"),
          cid: "logo@inline",
        },
      ],
    };

    await transport.sendMail(message);

    console.log("✅ Повідомлення надіслано успішно");
  } catch (error) {
    console.error("❌ Помилка при надсиланні листа:", error);
    throw error;
  }
};

module.exports = sendEmail;
