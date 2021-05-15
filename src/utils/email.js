const nodemailer = require("nodemailer");

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
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT,
        subject: "CoWin Free Slots Available!",
        html: `
        <p>Hi,</p>
        <p>${centers.length} hospitals currently have empty vaccination slots in your district.
        Visit <a href='https://cowin.gov.in'>CoWin</a> to book now!</p>
        <p>Happy Vaccination!</p>
        `,
      };

      await transport.sendMail(mailOptions);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
