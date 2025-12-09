const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,            // Use Port 587 (TLS) instead of 465
      secure: false,        // Must be 'false' for Port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // --- CRITICAL FIXES FOR RENDER ---
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false, // Fixes SSL issues in cloud containers
      },
      // FORCE IPv4: This fixes the "Connection Timeout" on Render
      family: 4, 
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
    // Log the full error object if message is vague
    if (error.code === 'EAUTH') console.error("Check your EMAIL_USER and EMAIL_PASS in Render Environment!");
  }
};

module.exports = sendEmail;