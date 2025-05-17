const { controllerWrapper, sendEmail } = require("../helpers/index");

const sendingEmail = async (req, res, next) => {
  const { name, comment } = req.body;

  const emailText = {
    to: "com@oe.cv.ua",
    // "sobkowowa@gmail.com",
    subject: "Пропозиції для АТ «Чернівціобленерго»",
    html: `
  <div style="font-family: Arial, sans-serif; color: #ffffff; padding: 20px; background: linear-gradient(90deg, rgb(21, 21, 29) 0%, rgb(25, 23, 58) 100%); color: #ffffff;">
    <img src="cid:logo@inline" alt="Логотип" style="width: 480px; margin-bottom: 20px;" />

    <h2 style="color: #ffffff; margin-top: 0;">Пропозиція для АТ «Чернівціобленерго»</h2>

    <p style="font-size: 16px;">
      <strong>${name || "Анонімний користувач"}</strong> залишив(ла) наступний коментар:
    </p>

    <blockquote style="font-size: 16px; border-left: 4px solid coral; margin: 10px 0; padding-left: 10px;">
      ${comment}
    </blockquote>

    <p style="font-size: 14px; color: #cccccc;">Надіслано через форму на сайті зі знижками.</p>
  </div>
`,
  };

  try {
    await sendEmail(emailText);
    res.status(201).json("Повідомлення відіслано");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json("Помилка відправлення повідомлення");
  }
};

module.exports = {
  sendingEmail: controllerWrapper(sendingEmail),
};
