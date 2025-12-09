const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Let Nodemailer handle host/port automatically
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // FORCE IPv4: Fixes network timeouts on Render
      family: 4, 
      // Increase timeouts for slow cloud networks
      connectionTimeout: 10000, 
      greetingTimeout: 5000,
    });

    console.log(`Attempting to send email to: ${email}`);

    const info = await transporter.sendMail({
      from: `"AlumniConnect" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("✅ Email sent successfully. Message ID: " + info.messageId);
  } catch (error) {
    console.error("❌ Email NOT sent. Error:", error.message);
  }
};

module.exports = sendEmail;