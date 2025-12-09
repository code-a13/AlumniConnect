const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_USER, // Your Brevo Login Email
        pass: process.env.BREVO_PASS, // Your Brevo SMTP Key
      },
    });

    console.log(`Attempting to send email to: ${email}`);

    // IMPORTANT: The 'from' email must be the one you used to sign up for Brevo
    const info = await transporter.sendMail({
      from: `"AlumniConnect Admin" <${process.env.BREVO_USER}>`, 
      to: email,
      subject: subject,
      text: text,
    });

    console.log("✅ Email sent successfully. ID: " + info.messageId);
  } catch (error) {
    console.error("❌ Email NOT sent. Error:", error.message);
  }
};

module.exports = sendEmail;