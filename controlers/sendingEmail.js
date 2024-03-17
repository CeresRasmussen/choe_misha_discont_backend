const { controllerWrapper, sendEmail } = require("../helpers/index");

const sendingEmail = async (req, res, next) => {
  const { name, comment } = req.body;

  const emailText = {
    to: "sobkowowa@gmail.com",
    subject: "Пропозиції з сайту",
    text: `Користувач ${name} залишив наступний коментар "${comment}"`,
  };

  await sendEmail(emailText);

  res.status(201).json("Повідомлення відіслано");
};

module.exports = {
  sendingEmail: controllerWrapper(sendingEmail),
};
