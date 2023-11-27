const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "aahad021182015@gmail.com",
      pass: "uuckdrvxktodxizd",
    },
  });

async function sendEmail(email, verify, template) {
   
    const info = await transporter.sendMail({
      from: 'aahad021182015@gmail.com', // sender address
      to:  email, // list of receivers
      subject: "Verification OTP", // Subject line
      html: template(verify), // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  }

  module.exports = sendEmail;