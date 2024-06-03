import nodemailer from "nodemailer";
import "dotenv/config";

const port = process.env.PORT || 8080;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (emailData) => {
  try {
    await transport.sendMail({ from: process.env.MAIL_SENDER, ...emailData });
    return true;
  } catch (error) {
    return false;
  }
};

const registerTemplate = ({ email, verificationToken }) => {
  const link = `http://localhost:${port}/users/verify/${verificationToken}`;

  return {
    to: email,
    subject: "Confirmation for base contact",
    html: `<h2>Welcome to your contact database</h2><p>To confirm your email address, please follow this <a href=${link}>link</a></p>`,
    text: `Welcome to your contact database
            To confirm your email address, please follow this link ${link}`,
  };
};

export default { sendEmail, registerTemplate };
