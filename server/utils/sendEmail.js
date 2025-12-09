const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Explicitly define host
      port: 465,              // Use Secure Port 465
      secure: true,           // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log(" Email sent successfully to " + email);
  } catch (error) {
    console.log(" Email not sent");
    console.error(error);
  }
};

module.exports = sendEmail;