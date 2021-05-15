const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = (centers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await ejs.renderFile(
        __dirname + "/views/mail-template.ejs",
        { centers }
      );
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT,
        subject: "CoWin Free Slots Available!",
        html,
      };

      await transport.sendMail(mailOptions);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
