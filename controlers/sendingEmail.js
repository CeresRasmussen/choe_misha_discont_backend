const { controllerWrapper, sendEmail } = require("../helpers/index");

const sendingEmail = async (req, res, next) => {
  const { name, comment } = req.body;
  let emailText = {
    // to: "com@oe.cv.ua",
    to: "sobkowowa@gmail.com",
    subject: "Пропозиції для АТ «Чернівціобленерго»",
    text: "",
  };

  if (name) {
    emailText.text = `Користувач ${name} залишив наступний коментар: "${comment}"`;
  } else {
    emailText.text = `Анонімний залишив наступний коментар: "${comment}"`;
  }

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
